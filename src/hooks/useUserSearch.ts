import { useState } from 'react';
import {GitHubUser} from "../models/GitHubUser.ts";
import {Repository} from "../models/Repository.ts";
import {getRepositories, getUsers} from "../services/githubService.ts";

/**
 * Custom hook for handling user and repository data fetching from GitHub.
 *
 * This hook encapsulates the logic for fetching user details and their repositories,
 * managing related states including loading, errors, and pagination for repositories.
 *
 * @returns {
 *   userData: GitHubUser | null - The current GitHub user's data.
 *   isLoading: boolean - Indicates if the data fetching process is ongoing.
 *   error: string - Error message if an error occurs during data fetching.
 *   repositories: Repository[] - List of repositories for the current GitHub user.
 *   page: number - The current page number for paginated repository fetching.
 *   handleInitialUserAndRepoSearch: (username: string) => void - Function to initiate fetching user data and their repositories.
 *   handleLoadMoreRepositories: () => void - Function to load more repositories (pagination).
 * }
 */
export const useUserSearch = (): UseUserSearchReturn => {
    const [userData, setUserData] = useState<GitHubUser | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);

    const handleInitialUserAndRepoSearch = (username: string) => {
        setPage(1);
        setIsLoading(true);
        getUsers(username)
            .then(userDataResponse => {
                setUserData(userDataResponse.data as GitHubUser);
                return getRepositories(username, 1);
            })
            .then(repositoryResponse => {
                setRepositories(repositoryResponse.data as Repository[]);
                setHasMore(!!repositoryResponse.headers.link);
            })
            .catch(error => {
                setError(`Error occurred: ${error.message}`);
                setRepositories([]);
                setUserData(null);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleLoadMoreRepositories = () => {
        if (!hasMore || !userData) return;

        const nextPage = page + 1;

        getRepositories(userData.login, nextPage)
            .then(repositoryResponse => {
                setRepositories(prevState => [...prevState, ...(repositoryResponse.data as Repository[])]);
                setHasMore(!!repositoryResponse.headers.link);
                setPage(nextPage);
            })
            .catch(error => {
                setError(`Error occurred: ${error.message}`);
                setRepositories([]);
                setUserData(null);
            });
    };

    const handleChange = () => {
        setError("");
    }

    return { userData, isLoading, error, repositories, page, handleInitialUserAndRepoSearch, handleLoadMoreRepositories, handleChange };
};

interface UseUserSearchReturn {
    userData: GitHubUser | null;
    isLoading: boolean;
    error: string;
    repositories: Repository[];
    page: number;
    handleInitialUserAndRepoSearch: (username: string) => void;
    handleLoadMoreRepositories: () => void;
    handleChange: () => void;
}
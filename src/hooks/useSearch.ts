import { useState } from 'react';
import {Repository} from "../models/Repository.ts";
import {getRepositories} from "../services/githubService.ts";

/**
 * Custom hook for handling repository data fetching from GitHub.
 *
 * This hook encapsulates the logic for fetching users repositories,
 * managing related states including loading, errors, and pagination for repositories.
 *
 * @returns {
 *   isLoading: boolean - Indicates if the data fetching process is ongoing.
 *   error: string - Error message if an error occurs during data fetching.
 *   repositories: Repository[] - List of repositories for the current GitHub user.
 *   page: number - The current page number for paginated repository fetching.
 *   handleInitialRepositoriesLoad: (username: string) => void - Function to initiate fetching user data and their repositories.
 *   handleLoadMoreRepositories: () => void - Function to load more repositories (pagination).
 * }
 */
export const useSearch = (): UseSearchReturn => {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);

    const handleInitialRepositoriesLoad = async (username: string) => {
        try {
            const repositoryResponse = await getRepositories(username, 1);
            setRepositories(repositoryResponse.data as Repository[]);
            setHasMore(!!repositoryResponse.headers.link);
        } catch(error: any) {
            setError(`Error occurred: ${error.message}`);
            setRepositories([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLoadMoreRepositories = async (username: string) => {
        if (!hasMore) return;

        const nextPage = page + 1;

        try {
            const repositoryResponse = await getRepositories(username, nextPage);
            setRepositories(prevState => [...prevState, ...(repositoryResponse.data as Repository[])]);
            setHasMore(!!repositoryResponse.headers.link);
            setPage(nextPage);
        } catch(error: any) {
            setError(`Error occurred: ${error.message}`);
            setRepositories([]);
        }
    };

    const handleChange = () => {
        setError("");
    }

    return { isLoading, error, repositories, page, handleInitialRepositoriesLoad, handleLoadMoreRepositories, handleChange };
};

interface UseSearchReturn {
    isLoading: boolean;
    error: string;
    repositories: Repository[];
    page: number;
    handleInitialRepositoriesLoad: (username: string) => void;
    handleLoadMoreRepositories: (username: string) => void;
    handleChange: () => void;
}
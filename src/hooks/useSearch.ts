import {useState} from 'react';
import {Repository} from "../models/Repository.ts";
import {getRepositories, RepositoriesResponse} from "../services/githubService.ts";
import {hasNextPage} from "../services/stringUtils.ts";
import {useFetch} from "./useFetch.ts";

/**
 * Custom hook for handling repository data fetching from GitHub.
 *
 * This hook encapsulates the logic for fetching users repositories,
 * managing related states including loading, errors, and pagination for repositories.
 *
 * @returns {
 *   isLoading: boolean - Indicates if the initial data loading process is ongoing.
 *   isPagingLoading: boolean - Indicates if the page loading process is ongoing.
 *   error: string - Error message if an error occurs during data fetching.
 *   repositories: Repository[] - List of repositories for the current GitHub user.
 *   page: number - The current page number for paginated repository fetching.
 *   handleInitialRepositoriesLoad: (username: string) => void - Function to initiate fetching user data and their repositories.
 *   handleLoadMoreRepositories: () => void - Function to load more repositories (pagination).
 * }
 */
export const useSearch = (): UseSearchReturn => {

    const {isLoading, error, fetchData} = useFetch<RepositoriesResponse>(true);
    const [isPagingLoading, setIsPagingLoading] = useState<boolean>(false);
    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);

    const handleInitialRepositoriesLoad = async (username: string) => {
        const repositoryResponse = await fetchData(() => getRepositories(username, 1));
        if (!repositoryResponse) setRepositories([]);
        if (repositoryResponse) {
            setRepositories(repositoryResponse.data as Repository[]);
            setHasMore(repositoryResponse.headers.link ? hasNextPage(repositoryResponse.headers.link) : false);
        }
    };

    const handleLoadMoreRepositories = async (username: string) => {
        if (!hasMore) return;

        const nextPage = page + 1;

        setIsPagingLoading(true);
        const repositoryResponse = await fetchData(() => getRepositories(username, nextPage));
        if (!repositoryResponse) setRepositories([]);
        if (repositoryResponse) {
            setRepositories(prevState => [...prevState, ...(repositoryResponse.data as Repository[])]);
            setHasMore(repositoryResponse.headers.link ? hasNextPage(repositoryResponse.headers.link) : false);
            setPage(nextPage);
            setIsPagingLoading(false);
        }
    };

    return {isLoading: (isLoading && !isPagingLoading), isPagingLoading, error, repositories, page, handleInitialRepositoriesLoad, handleLoadMoreRepositories};
};

interface UseSearchReturn {
    isLoading: boolean;
    isPagingLoading: boolean;
    error: string;
    repositories: Repository[];
    page: number;
    handleInitialRepositoriesLoad: (username: string) => void;
    handleLoadMoreRepositories: (username: string) => void;
}
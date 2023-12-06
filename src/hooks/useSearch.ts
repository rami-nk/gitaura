import {useState} from 'react';
import {Repository} from "../models/Repository.ts";
import {getRepositories, RepositoriesResponse} from "../services/githubService.ts";
import {hasNextPage} from "../services/stringUtils.ts";
import {useFetch} from "./useFetch.ts";

/**
 * `useSearch` is a custom hook for fetching and managing GitHub repositories.
 * It encapsulates the logic for initial data loading, pagination, error handling, and state management related to repository data.
 *
 * @returns {UseSearchReturn} - An object containing various states and functions related to repository data fetching.
 *   - `isLoading` (boolean): Indicates if the initial data loading process is ongoing. This is true when initial data is being fetched and false during pagination.
 *   - `isPagingLoading` (boolean): Indicates if additional data (pagination) is being loaded.
 *   - `error` (string): Error message if an error occurs during data fetching.
 *   - `repositories` (Repository[]): Array of repositories fetched from GitHub for the specified user.
 *   - `page` (number): The current page number in the pagination sequence.
 *   - `handleInitialRepositoriesLoad` (function): Function to initiate the fetching of user repositories. It should be called with the GitHub username.
 *   - `handleLoadMoreRepositories` (function): Function to load more repositories for pagination. It continues fetching repositories from the next page.
 *
 * Usage:
 * This hook is primarily used in components where displaying a list of GitHub repositories is required. It handles both the initial fetch and subsequent pagination of repositories.
 *
 * Example:
 * const { isLoading, isPagingLoading, repositories, handleInitialRepositoriesLoad, handleLoadMoreRepositories } = useSearch();
 * handleInitialRepositoriesLoad('githubUsername');
 * // For pagination
 * if (isPagingLoading) {
 *    handleLoadMoreRepositories('githubUsername');
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
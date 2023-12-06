import {useState} from 'react';
import {Repository} from "../models/Repository.ts";
import {RepositorySearchResponse, searchForRepository} from '../services/githubService.ts';
import {useFetch} from './useFetch.ts';

/**
 * `useRepositoryFilter` is a custom hook for handling the search and filtering of GitHub repositories.
 * It's designed to manage states and operations related to filtering repositories based on search criteria like language and search string.
 *
 * @param {string | undefined} username - The GitHub username to filter repositories. If undefined, the hook does not perform any operations.
 *
 * @returns {UseRepositoryFilterReturn} - An object containing the hook's state and functions.
 *   - `filteredRepositories` (Repository[]): The array of repositories that match the search and filter criteria.
 *   - `isLoading` (boolean): Indicates if the search/filter process is ongoing.
 *   - `error` (string): Contains an error message if an error occurs during the search operation.
 *   - `showFilterResults` (boolean): Flag to indicate whether the filter results should be displayed.
 *   - `handleSearchInRepository` (function): A function to perform a repository search based on a provided search string and language.
 *     It updates the state with the search results.
 *
 * Usage:
 * This hook is used to perform searches for repositories based on specified criteria like a search string or programming language.
 * It's particularly useful for filtering repositories for a specific GitHub user.
 *
 * Example:
 * const { filteredRepositories, isLoading, error, showFilterResults, handleSearchInRepository } = useRepositoryFilter('username');
 * handleSearchInRepository('searchString', 'language');
 */
export const useRepositoryFilter = (username: string | undefined): UseRepositoryFilterReturn => {
    const [filteredRepositories, setFilteredRepositories] = useState<Repository[]>([]);
    const [showFilterResults, setShowFilterResults] = useState<boolean>(false);
    const {error, isLoading, fetchData} = useFetch<RepositorySearchResponse>();

    const handleSearchInRepository = async (searchString: string, language: string) => {
        if (!username) return;

        if (searchString.trim() === "" && language.trim() === "") {
            setShowFilterResults(false);
            setFilteredRepositories([]);
            return;
        }

        const repositoryResponse = await fetchData(() => searchForRepository(username, searchString, language));
        if (!repositoryResponse) {
            setShowFilterResults(false);
            setFilteredRepositories([]);
        }
        if (repositoryResponse) {
            setShowFilterResults(true);
            setFilteredRepositories(repositoryResponse.data.items as Repository[]);
        }
    };

    return {error, isLoading, filteredRepositories, showFilterResults: showFilterResults, handleSearchInRepository};
};

interface UseRepositoryFilterReturn {
    filteredRepositories: Repository[];
    isLoading: boolean;
    error: string;
    showFilterResults: boolean;
    handleSearchInRepository: (searchString: string, language: string) => void;
}
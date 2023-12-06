import {useState} from 'react';
import {Repository} from "../models/Repository.ts";
import {RepositorySearchResponse, searchForRepository} from '../services/githubService.ts';
import {useFetch} from './useFetch.ts';

/**
 * Custom hook for handling the search and filtering of repositories.
 *
 * This hook manages states related to repository search results, including
 * the visibility of search results and the filtered list of repositories.
 * It performs search queries based on a given search string and user data.
 *
 * @returns {
 *   isLoading: boolean - Indicating if search process is ongoing.
 *   error: string - Error message if an error occurs during data fetching.
 *   filteredRepositories: Repository[] - The list of repositories filtered by the search query.
 *   showFilterResults: boolean - Indicates if fitler results should be displayed.
 *   handleFilterInRepository: (filterString: string, language: string) => void - Function to perform a search query and update filtered repositories.
 * }
 * @param username
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
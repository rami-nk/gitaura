import { useState } from 'react';
import {Repository} from "../models/Repository.ts";
import { searchForRepository } from '../services/githubService.ts';

/**
 * Custom hook for handling the search and filtering of repositories.
 *
 * This hook manages states related to repository search results, including
 * the visibility of search results and the filtered list of repositories.
 * It performs search queries based on a given search string and user data.
 *
 * @returns {
 *   filteredRepositories: Repository[] - The list of repositories filtered by the search query.
 *   showFilterResults: boolean - Indicates if fitler results should be displayed.
 *   handleFilterInRepository: (filterString: string, language: string) => void - Function to perform a search query and update filtered repositories.
 * }
 * @param username
 */
export const useRepositoryFilter = (username: string | undefined): UseRepositoryFilterReturn => {
    const [filteredRepositories, setFilteredRepositories] = useState<Repository[]>([]);
    const [showFilterResults, setFilterResults] = useState<boolean>(false);

    const handleSearchInRepository = (searchString: string, language: string) => {
        if (!username) return;

        if (searchString.trim() === "" && language.trim() === "") {
            setFilterResults(false);
            setFilteredRepositories([]);
            return;
        }

        searchForRepository(username, searchString, language)
            .then(response => {
                setFilterResults(true);
                setFilteredRepositories(response.data.items as Repository[]);
            })
            .catch(error => {
                console.error('Error searching for repositories:', error);
                setFilterResults(false);
                setFilteredRepositories([]);
            });
    };

    return { filteredRepositories, showFilterResults: showFilterResults, handleSearchInRepository };
};

interface UseRepositoryFilterReturn {
    filteredRepositories: Repository[];
    showFilterResults: boolean;
    handleSearchInRepository: (searchString: string, language: string) => void;
}
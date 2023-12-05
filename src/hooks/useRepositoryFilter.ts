import { useState } from 'react';
import {GitHubUser} from "../models/GitHubUser.ts";
import {Repository} from "../models/Repository.ts";
import { searchForRepository } from '../services/githubService.ts';

/**
 * Custom hook for handling the search and filtering of repositories.
 *
 * This hook manages states related to repository search results, including
 * the visibility of search results and the filtered list of repositories.
 * It performs search queries based on a given search string and user data.
 *
 * @param {GitHubUser | null} userData - The current GitHub user's data used for searching repositories.
 * @returns {
 *   filteredRepositories: Repository[] - The list of repositories filtered by the search query.
 *   showSearchResults: boolean - Indicates if search results should be displayed.
 *   handleSearchInRepository: (searchString: string) => void - Function to perform a search query and update filtered repositories.
 * }
 */
export const useRepositoryFilter = (userData: GitHubUser | null): UseRepositoryFilterReturn => {
    const [filteredRepositories, setFilteredRepositories] = useState<Repository[]>([]);
    const [showSearchResults, setShowSearchResults] = useState<boolean>(false);

    const handleSearchInRepository = (searchString: string) => {
        if (!userData) return;

        if (searchString.trim() === "") {
            setShowSearchResults(false);
            setFilteredRepositories([]);
            return;
        }

        searchForRepository(userData.login, searchString)
            .then(response => {
                setShowSearchResults(true);
                setFilteredRepositories(response.data.items as Repository[]);
            })
            .catch(error => {
                console.error('Error searching repositories:', error);
                setShowSearchResults(false);
                setFilteredRepositories([]);
            });
    };

    return { filteredRepositories, showSearchResults, handleSearchInRepository };
};

interface UseRepositoryFilterReturn {
    filteredRepositories: Repository[];
    showSearchResults: boolean;
    handleSearchInRepository: (searchString: string) => void;
}
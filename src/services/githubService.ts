import {Octokit} from "@octokit/core";
import {restEndpointMethods} from "@octokit/plugin-rest-endpoint-methods";
import {paginateRest} from "@octokit/plugin-paginate-rest";
import {Endpoints} from "@octokit/types";

const GitAuraOctokit = Octokit.plugin(restEndpointMethods, paginateRest);
const octokit = new GitAuraOctokit();

/**
 * Fetches a GitHub user's profile information.
 *
 * @param {string} username - The GitHub username of the user to retrieve information for.
 * @returns {Promise<GitHubUserResponse>} - A promise that resolves to the user's profile information.
 *
 * Usage:
 * This function is used to retrieve detailed information about a specific GitHub user,
 * such as their profile details, using their username.
 *
 * Example:
 * getUsers('octocat').then(user => console.log(user));
 */
export const getUsers = async (username: string): Promise<GitHubUserResponse> => {
    return octokit.request("GET /users/{username}", {
        username: username,
    });
}

/**
 * Fetches a list of repositories for a given GitHub user.
 *
 * @param {string} username - The GitHub username whose repositories are to be fetched.
 * @param {number} page - The page number in the pagination for repository listings.
 * @param {number} [perPage=15] - The number of repositories to fetch per page. Defaults to 15.
 * @returns {Promise<RepositoriesResponse>} - A promise that resolves to a list of repositories.
 *
 * Usage:
 * This function is utilized to get a paginated list of repositories owned by a specific GitHub user.
 *
 * Example:
 * getRepositories('octocat', 1).then(repos => console.log(repos));
 */
export const getRepositories = async (username: string, page: number, perPage: number = 15): Promise<RepositoriesResponse> => {
    return octokit.request("GET /users/{username}/repos", {
        username: username,
        per_page: perPage,
        page: page,
    });
}

/**
 * Searches for repositories based on a search string and/or language within a specific user's repositories.
 *
 * @param {string} username - The GitHub username within whose repositories the search is performed.
 * @param {string} [searchString] - The string to search for in the repositories.
 * @param {string} [language] - The programming language to filter the repositories.
 * @returns {Promise<RepositorySearchResponse>} - A promise that resolves to the search results.
 *
 * Usage:
 * This function is useful for searching through a user's repositories using specific criteria,
 * such as keywords or programming languages.
 *
 * Example:
 * searchForRepository('octocat', 'octo-library', 'JavaScript').then(results => console.log(results));
 */
export const searchForRepository = async (username: string, searchString?: string, language?: string): Promise<RepositorySearchResponse> => {
    let query = `user:${username}+fork:true`;
    if (searchString) {
        query += `+${searchString}`;
    }
    if (language) {
        language = language === "C++" ? "cpp" : language; // ++ messing url encoding up
        query += `+language:${language}`;
    }

    return octokit.rest.search.repos({
        q: query,
    });
}

/**
 * Fetches the programming languages used in all repositories of a given GitHub user.
 *
 * @param {string} username - The GitHub username whose repositories' languages are to be fetched.
 * @param {(languages: (null | undefined | string)[]) => void} updateLanguages - Callback function to process the languages from each repository.
 * @returns {Promise<void>} - A promise that resolves when all pages have been paginated.
 *
 * Usage:
 * This function is primarily used to gather an array of programming languages used across all repositories of a specific GitHub user.
 *
 * Example:
 * getUsersProgrammingLanguages('octocat', languages => console.log(languages));
 */
export const getUsersProgrammingLanguages = (username: string, updateLanguages: (languages: (null | undefined | string)[]) => void) => {
    return octokit.paginate("GET /users/{username}/repos", {
            username: username,
            per_page: 100
        }, (response) => {
            const languagesFromPage = response.data.map(repository => repository.language);
            updateLanguages(languagesFromPage);
            return languagesFromPage;
        }
    );
}

export type GitHubUserResponse = Endpoints["GET /users/{username}"]["response"];
export type RepositoriesResponse = Endpoints["GET /users/{username}/repos"]["response"];
export type RepositorySearchResponse = Endpoints["GET /search/repositories"]["response"];
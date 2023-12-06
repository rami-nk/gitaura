import {Octokit} from "@octokit/core";
import {restEndpointMethods} from "@octokit/plugin-rest-endpoint-methods";
import {paginateRest} from "@octokit/plugin-paginate-rest";
import {Endpoints} from "@octokit/types";

const GitAuraOctokit = Octokit.plugin(restEndpointMethods, paginateRest);
const octokit = new GitAuraOctokit();

export const getUsers = async (username: string) => {
    return octokit.request("GET /users/{username}", {
        username: username,
    });
}

export type RepositoriesResponse = Endpoints["GET /users/{username}/repos"]["response"];

export const getRepositories = async (username: string, page: number, perPage: number = 15): Promise<RepositoriesResponse> => {
    return octokit.request("GET /users/{username}/repos", {
        username: username,
        per_page: perPage,
        page: page,
    });
}

export const searchForRepository = async (username: string, searchString?: string, language?: string) => {
    const query = [
        `user:${username}`,
        searchString,
        (language ? `language:${language}` : "")].join(" ");
    return octokit.rest.search.repos({
        q: query,
    });
}

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
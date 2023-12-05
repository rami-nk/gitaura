import {Octokit} from "@octokit/core";
import {restEndpointMethods} from "@octokit/plugin-rest-endpoint-methods";

const GitAuraOctokit = Octokit.plugin(restEndpointMethods);
const octokit = new GitAuraOctokit ();

export const getUsers = async (username: string) => {
    return octokit.request("GET /users/{username}", {
        username: username,
    });
}

export const getRepositories = async (username: string, page: number, perPage: number = 15) => {
    return octokit.request("GET /users/{username}/repos", {
        username: username,
        per_page: perPage,
        page: page,
    });
}

export const searchForRepository = async (username: string, searchString?: string) => {
    const query = `user:${username} ${searchString}`;
    return octokit.rest.search.repos({
        q: query,
    });
}
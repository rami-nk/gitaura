import {Octokit} from "@octokit/core";

const octokit = new Octokit();

export const getUsers = async (username: string) => {
    return octokit.request("GET /users/{username}", {
        username: username,
    });
}

export const getRepositories = async (username: string, page: number, perPage: number = 5) => {
    return octokit.request("GET /users/{username}/repos", {
        username: username,
        per_page: perPage,
        page: page,
    });
}
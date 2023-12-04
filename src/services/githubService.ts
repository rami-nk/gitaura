import {Octokit} from "@octokit/core";

const octokit = new Octokit();

export const getUsers = async (username: string) => {
    return octokit.request("GET /users/{username}", {
        username: username
    });
}
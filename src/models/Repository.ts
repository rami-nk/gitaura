import {RepositoryOwner} from "./RepositoryOwner.ts";
import {License} from "./License";

export interface Repository {
    id: number;
    name: string;
    full_name: string;
    forks_count?: number;
    stargazers_count?: number;
    watchers_count?: number;
    html_url: string;
    description: string | null;
    fork: boolean;
    language: string;
    updated_at: string | null;
    license: License | null;
    owner: RepositoryOwner;
}
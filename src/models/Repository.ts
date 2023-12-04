import {RepositoryOwner} from "./RepositoryOwner.ts";

export interface Repository {
    id: number;
    node_id: string;
    name: string;
    full_name: string;
    private: boolean;
    html_url: string;
    description: string | null;
    fork: boolean;
    url: string;
    languages_url: string;
    created_at: string | null;
    updated_at: string | null;
    owner: RepositoryOwner;
}
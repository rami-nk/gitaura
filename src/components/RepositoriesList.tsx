import {Repository} from "../models/Repository.ts";
import RepositoryCard from "./RepositoryCard.tsx";
import React from "react";

interface RepositoriesListProps {
    repositories: Repository[];
}

const RepositoriesList: React.FC<RepositoriesListProps> = (props) => {
    return (
        <>
            {
                props.repositories.map(repository =>
                    <RepositoryCard key={repository.id} repository={repository}/>
                )
            }
        </>
    );
}

export default RepositoriesList;
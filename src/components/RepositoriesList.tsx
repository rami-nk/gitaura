import {Repository} from "../models/Repository.ts";
import RepositoryCard from "./RepositoryCard.tsx";
import React, {useEffect, useRef} from "react";

interface RepositoriesListProps {
    repositories: Repository[];
    onLoadMore: () => void;
}

const RepositoriesList: React.FC<RepositoriesListProps> = (props) => {

    const loadMoreRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observerCallback = (entries: any) => {
            entries.forEach((entry: { isIntersecting: any; }) => {
                if (entry.isIntersecting) {
                    props.onLoadMore();
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, {
            root: null,
            rootMargin: "20%",
            threshold: 1.0,
        });

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }

        return () => {
            if (loadMoreRef.current) {
                observer.unobserve(loadMoreRef.current);
            }
        };
    }, [props.onLoadMore]);

    return (
        <>
            {
                props.repositories.map(repository =>
                    <RepositoryCard key={repository.id} repository={repository}/>
                )
            }
            <div ref={loadMoreRef}/>
        </>
    );
}

export default RepositoriesList;
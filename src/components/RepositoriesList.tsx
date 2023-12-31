import {Repository} from "../models/Repository.ts";
import RepositoryCard from "./RepositoryCard.tsx";
import React, {useEffect, useRef} from "react";
import {Spinner, Stack} from "@chakra-ui/react";

interface RepositoriesListProps {
    repositories: Repository[];
    onLoadMore?: () => void;
    isLoading?: boolean;
}

const RepositoriesList: React.FC<RepositoriesListProps> = (props) => {

    const loadMoreRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry: IntersectionObserverEntry) => {
                if (entry.isIntersecting && !props.isLoading) {
                    props.onLoadMore && props.onLoadMore();
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, {
            root: null,
            threshold: 0.1,
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
        <Stack width="full" mb={20}>
            {
                props.repositories.map(repository =>
                    <RepositoryCard key={repository.id} repository={repository}/>
                )
            }
            {
                props.isLoading && <Spinner alignSelf="center" mt={10}/>
            }
            {
                props.onLoadMore &&
                <div style={{height: "100px", width: "100%"}} ref={loadMoreRef}/>
            }
        </Stack>
    );
}

export default RepositoriesList;
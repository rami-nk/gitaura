import {Skeleton, Text, useToast, VStack} from "@chakra-ui/react";
import RepositoryFilter from "../components/RepositoryFilter.tsx";
import RepositoriesList from "../components/RepositoriesList.tsx";
import NoResults from "../components/NoResults.tsx";
import {useSearch} from "../hooks/useSearch.ts";
import {useRepositoryFilter} from "../hooks/useRepositoryFilter.ts";
import {useEffect, useState} from "react";
import {getUsersProgrammingLanguages} from "../services/githubService.ts";
import {useParams} from "react-router-dom";

const RepositoryViewPage = () => {

    const {username} = useParams();
    const [languages, setLanguages] = useState<string[]>([]);

    const {
        filteredRepositories,
        showFilterResults,
        isLoading: isFilerLoading,
        error: filterError,
        handleSearchInRepository
    } = useRepositoryFilter(username);
    const {
        isLoading,
        error: loadingError,
        isPagingLoading,
        repositories,
        handleInitialRepositoriesLoad,
        handleLoadMoreRepositories
    } = useSearch();

    const toast = useToast();

    useEffect(() => {
        if (loadingError.trim()  === "") return;
        toast({
            title: `Error while loading!`,
            status: "error",
            description: loadingError,
            isClosable: true,
        })
    }, [loadingError]);

    useEffect(() => {
        if (filterError.trim()  === "") return;
        toast({
            title: `Error while filter!`,
            status: "error",
            description: filterError,
            isClosable: true,
        })
    }, [filterError]);

    useEffect(() => {
        if (!username) return;
        handleInitialRepositoriesLoad(username);
    }, [username]);

    const handleUpdateLanguages = (newLanguages: (undefined | null | string)[]) => {
        setLanguages(prevLanguages => Array.from(new Set([...prevLanguages, ...newLanguages.filter(lang => lang) as string[]])));
    };

    useEffect(() => {
        if (!username) return;

        getUsersProgrammingLanguages(username, handleUpdateLanguages);
    }, [username]);

    return (
        <VStack w="100%" maxWidth="700px" spacing={16} mt={8} alignSelf="center">
            <RepositoryFilter onFilter={handleSearchInRepository}
                              languages={languages}/>
            <VStack w="full" spacing={2} align="center">
                {isLoading || isFilerLoading ? (
                    Array.from({length: 5}).map((_, index) => (
                        <Skeleton key={index} borderRadius="0.75rem" height="100px" width="full"/>
                    ))
                ) : showFilterResults ? (
                    filteredRepositories.length > 0 ? (
                        <>
                            <Text>{`${filteredRepositories.length} results matching repositories.`}</Text>
                            <RepositoriesList key={1} repositories={filteredRepositories}/>
                        </>
                    ) : (
                        <NoResults message={"0 Results"}/>
                    )
                ) : username && repositories.length > 0 ? (
                    <RepositoriesList key={2} isLoading={isPagingLoading}
                                      onLoadMore={() => handleLoadMoreRepositories(username)}
                                      repositories={repositories}/>
                ) : (
                    username && <NoResults message={`${username} doesn't have any public repositories yet.`}/>
                )}
            </VStack>
        </VStack>
    );
}

export default RepositoryViewPage;
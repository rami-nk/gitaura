import {Skeleton, Text, VStack} from "@chakra-ui/react";
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

    const {
        isLoading,
        repositories,
        handleInitialRepositoriesLoad,
        handleLoadMoreRepositories
    } = useSearch();

    useEffect(() => {
        if (!username) return;
        handleInitialRepositoriesLoad(username);
    }, [username]);

    const {
        filteredRepositories, showFilterResults, handleSearchInRepository
    } = useRepositoryFilter(username);

    const [languages, setLanguages] = useState<string[]>([]);

    const handleUpdateLanguages = (newLanguages: (undefined | null | string)[]) => {
        setLanguages(prevLanguages => Array.from(new Set([...prevLanguages, ...newLanguages.filter(lang => lang) as string[]])));
    };

    useEffect(() => {
        if (!username) return;

        getUsersProgrammingLanguages(username, handleUpdateLanguages);
    }, [username]);

    return (
        <VStack w="100%" spacing={8} mt={8} align="center">
            <RepositoryFilter onFilter={handleSearchInRepository}
                              languages={languages}/>
            <VStack w={["90%", "70%", "60%"]} spacing={2} align="center">
                {isLoading ? (
                    Array.from({length: 5}).map((_, index) => (
                        <Skeleton key={index} borderRadius="0.75rem" height="100px" width="full"/>
                    ))
                ) : showFilterResults ? (
                    filteredRepositories.length > 0 ? (
                        <>
                            <Text>{`${filteredRepositories.length} results matching repositories.`}</Text>
                            <RepositoriesList onLoadMore={() => {
                            }} repositories={filteredRepositories}/>
                        </>
                    ) : (
                        <NoResults message={"0 Results"}/>
                    )
                ) : username && repositories.length > 0 ? (
                    <RepositoriesList onLoadMore={() => handleLoadMoreRepositories(username)}
                                      repositories={repositories}/>
                ) : (
                    username && <NoResults message={`${username} doesn't have any public repositories yet.`}/>
                )}
            </VStack>
        </VStack>
    );
}

export default RepositoryViewPage;
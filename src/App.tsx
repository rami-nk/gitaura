import './App.scss'
import {
    Stack,
    VStack,
} from "@chakra-ui/react";
import UserSearchInput from "./components/UserSearchInput.tsx";
import Header from './components/Header.tsx';
import RepositoriesList from "./components/RepositoriesList.tsx";
import NoResults from './components/NoResults.tsx';
import RepositorySearch from "./components/RepositorySearch.tsx";
import {useUserSearch} from "./hooks/useUserSearch.ts";
import {useRepositoryFilter} from "./hooks/useRepositoryFilter.ts";

const App = () => {

    const {
        userData,
        isLoading,
        error,
        repositories,
        handleInitialUserAndRepoSearch, handleLoadMoreRepositories, handleChange
    } = useUserSearch();

    const {
        filteredRepositories, showSearchResults, handleSearchInRepository
    } = useRepositoryFilter(userData);

    return (
        <Stack spacing={2}>
            <Header/>
            <VStack w="100%" spacing={8} mt={20} align="center">
                <UserSearchInput onChange={handleChange} isLoading={isLoading} errorMessage={error}
                                 onSearch={handleInitialUserAndRepoSearch}/>
                <RepositorySearch onSearch={handleSearchInRepository}/>
                <VStack w={["90%", "70%", "60%"]} spacing={2} align="center">
                    {
                        showSearchResults && filteredRepositories.length !== 0 &&
                        <RepositoriesList onLoadMore={() => {
                        }} repositories={filteredRepositories}/>
                    }
                    {
                        !isLoading && userData && repositories.length > 0 && !showSearchResults &&
                        <RepositoriesList onLoadMore={handleLoadMoreRepositories} repositories={repositories}/>
                    }
                    {
                        (!isLoading && !error && userData && repositories.length === 0) &&
                        <NoResults message={"No public repositories found!"}/>
                    }
                    {
                        (showSearchResults && filteredRepositories.length === 0) &&
                        <NoResults message={"0 Results"}/>
                    }
                </VStack>
            </VStack>
        </Stack>
    )
}

export default App
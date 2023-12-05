import {useState} from 'react';
import './App.scss'
import {
    Stack,
    VStack,
} from "@chakra-ui/react";
import UserSearchInput from "./components/UserSearchInput.tsx";
import {GitHubUser} from "./models/GitHubUser.ts";
import Header from './components/Header.tsx';
import {getRepositories, getUsers} from "./services/githubService.ts";
import {Repository} from "./models/Repository.ts";
import RepositoriesList from "./components/RepositoriesList.tsx";
import NoResults from './components/NoResults.tsx';

const App = () => {

    const [userData, setUserData] = useState<GitHubUser | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);

    const handleSearch = (username: string) => {
        setPage(1);
        setIsLoading(true);
        getUsers(username)
            .then(userDataResponse => {
                setUserData(userDataResponse.data as GitHubUser);
                return getRepositories(username, 1);
            })
            .then(repositoryResponse => {
                setRepositories(repositoryResponse.data as Repository[]);
                setHasMore(!!repositoryResponse.headers.link);
            })
            .catch(error => {
                const notFoundError = error.message === "Not Found";
                setError(notFoundError ?
                    `No github user called ${username}. Try again!` :
                    `Error occurred: ${error.message}`);
                setRepositories([]);
                setUserData(null);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const handleChange = () => {
        setError("");
    }

    const handleLoadMoreRepositories = () => {
        if (!hasMore || !userData) return;

        const nextPage = page + 1;

        getRepositories(userData!.login, nextPage)
            .then(repositoryResponse => {
                setRepositories(prevState => [...prevState, ...(repositoryResponse.data as Repository[])]);
                setHasMore(!!repositoryResponse.headers.link);
                setPage(nextPage);
            })
            .catch(error => {
                const notFoundError = error.message === "Not Found";
                setError(notFoundError ?
                    `No github user called ${userData!.login}. Try again!` :
                    `Error occurred: ${error.message}`);
                setRepositories([]);
                setUserData(null);
                console.error(error);
            });
    };

    return (
        <Stack spacing={2}>
            <Header/>
            <VStack w="100%" spacing={8} mt={20} align="center">
                <UserSearchInput onChange={handleChange} isLoading={isLoading} errorMessage={error}
                                 onSearch={handleSearch}/>
                <VStack w={["90%", "70%", "60%"]} spacing={2} align="center">
                    {
                        !isLoading && userData && repositories.length > 0 &&
                        <RepositoriesList onLoadMore={handleLoadMoreRepositories} repositories={repositories}/>
                    }
                    {
                        !isLoading && !error && userData && repositories.length === 0 &&
                        <NoResults/>
                    }
                </VStack>
            </VStack>
        </Stack>
    )
}

export default App
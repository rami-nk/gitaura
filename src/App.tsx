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
import RepositoryCard from "./components/RepositoryCard.tsx";
import {NoResults} from "./components/NoResults.tsx";

const App = () => {

    const [userData, setUserData] = useState<GitHubUser | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [repositories, setRepositories] = useState<Repository[]>([]);

    const handleSearch = (username: string) => {
        setIsLoading(true);
        getUsers(username)
            .then(userDataResponse => {
                setUserData(userDataResponse.data as GitHubUser);
                getRepositories(username)
                    .then(repositoryResponse => {
                        setRepositories(repositoryResponse.data as Repository[]);
                        setIsLoading(false);
                    })
                    .catch(_ => {
                        setError(`Unexpected error occured!`);
                        setRepositories([]);
                        setUserData(null);
                        setIsLoading(false);
                    });
            })
            .catch(_ => {
                setError(`No github user called ${username}. Try again!`)
                setRepositories([]);
                setUserData(null);
                setIsLoading(false);
            });
    }

    const handleChange = () => {
        setError("");
    }

    return (
        <Stack spacing={2}>
            <Header/>
            <VStack w="100%" spacing={8} mt={20} align="center">
                <UserSearchInput onChange={handleChange} isLoading={isLoading} errorMessage={error}
                                 onSearch={handleSearch}/>
                <VStack w={["90%", "70%", "60%"]} spacing={2} align="center">
                    {
                        !isLoading && userData && repositories.length > 0 &&
                        repositories.map(repository =>
                            <RepositoryCard repository={repository}/>
                        )
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
import {useState} from 'react';
import './App.scss'
import {Stack, Box, Collapse, VStack, Text} from "@chakra-ui/react";
import UserSearchInput from "./components/UserSearchInput.tsx";
import {GitHubUser} from "./models/GitHubUser.ts";
import Header from './components/Header.tsx';
import {getRepositories, getUsers} from "./services/githubService.ts";
import {Repository} from "./models/Repository.ts";

const App = () => {

    const [userData, setUserData] = useState<GitHubUser | null>(null);
    const [isUserLoading, setIsUserLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [repositories, setRepositories] = useState<Repository[]>([]);

    const handleSearch = (username: string) => {
        setIsUserLoading(true);
        getUsers(username)
            .then(userDataResponse => {
                setUserData(userDataResponse.data as GitHubUser);
                setIsUserLoading(false);
                getRepositories(username)
                    .then(repositoryResponse => setRepositories(repositoryResponse.data as Repository[]))
                    .catch(error => console.log(error));
            })
            .catch(_ => {
                setError(`No github user called ${username}. Try again!`)
                setIsUserLoading(false);
            });
    }

    const handleChange = () => {
        setError("");
    }

    return (
        <Stack spacing={2}>
            <Header/>
            <VStack spacing={8} mt={20} align="center">
                <UserSearchInput onChange={handleChange} isLoading={isUserLoading} errorMessage={error} onSearch={handleSearch}/>
                <Collapse in={!!userData?.avatar_url} animateOpacity>
                    <Box
                        w='210px'
                        color='white'
                        mt='4'
                        rounded='md'
                        shadow='md'
                    >
                        {
                            repositories.map(repository =>
                                <Text key={repository.id}>{repository.name}</Text>
                            )
                        }
                    </Box>
                </Collapse>
            </VStack>
        </Stack>
    )
}

export default App
import {useState} from 'react';
import './App.scss'
import {Image, Stack, Box, Collapse, VStack} from "@chakra-ui/react";
import UserSearchInput from "./components/UserSearchInput.tsx";
import {GitHubUser} from "./models/GitHubUser.ts";
import Header from './components/Header.tsx';
import {getUsers} from "./services/githubService.ts";


function App() {

    const [userData, setUserData] = useState<GitHubUser | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleSearch = (username: string) => {
        setIsLoading(true);
        getUsers(username)
            .then(response => {
                setUserData(response.data as GitHubUser);
                setIsLoading(false);
            })
            .catch(_ => {
                setError(`No github user called ${username}. Try again!`)
                setIsLoading(false);
            });
    }

    const handleChange = () => {
        setError("");
    }

    return (
        <Stack spacing={2}>
            <Header/>
            <VStack spacing={8} mt={20} align="center">
                <UserSearchInput onChange={handleChange} isLoading={isLoading} errorMessage={error} onSearch={handleSearch}/>
                <Collapse in={!!userData?.avatar_url} animateOpacity>
                    <Box
                        w='210px'
                        color='white'
                        mt='4'
                        rounded='md'
                        shadow='md'
                    >
                        <Image src={userData?.avatar_url}/>
                    </Box>
                </Collapse>
            </VStack>
        </Stack>
    )
}

export default App
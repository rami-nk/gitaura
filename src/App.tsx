import {useState} from 'react';
import './App.scss'
import {Image, Stack, Box, Collapse, VStack} from "@chakra-ui/react";
import UserSearchInput from "./components/UserSearchInput.tsx";
import {GitHubUser} from "./models/GitHubUser.ts";
import Header from './components/Header.tsx';


function App() {

    const [userData, setUserData] = useState<GitHubUser | null>(null);

    const handleSearch = (user: GitHubUser | null) => {
        setUserData(user);
    }

    return (
        <Stack spacing={2}>
            <Header/>
            <VStack spacing={8} mt={20} align="center">
                <UserSearchInput onSearch={handleSearch}/>
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
import {useState} from 'react';
import './App.scss'
import {Image, Heading, Stack} from "@chakra-ui/react";
import UserSearchInput from "./components/UserSearchInput.tsx";
import {GitHubUser} from "./models/GitHubUser.ts";


function App() {

    const [userData, setUserData] = useState<GitHubUser | null>(null);

    const handleSearch = (user: GitHubUser) => {
        setUserData(user);
    }

    return (
        <Stack spacing={2}>
            <Heading>GitAura</Heading>
            <UserSearchInput onSearch={handleSearch}/>
            <Image src={userData?.avatar_url}/>
        </Stack>
    )
}

export default App
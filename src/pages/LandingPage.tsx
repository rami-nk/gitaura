import { VStack } from "@chakra-ui/layout";
import UserSearchInput from "../components/UserSearchInput.tsx";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {getUsers} from "../services/githubService.ts";

const LandingPage = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const navigate = useNavigate();

    const handleSearch = async (username: string) => {
        setIsLoading(true);
        try {
            const usersResponse = await getUsers(username);
            navigate(`/repositories/${usersResponse.data.login}`)
        } catch(error: any) {
            setError(error.message === "Not Found" ?
                `No user with name ${username}.` :
                `Error occurred: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = () => {
        setError("");
    }

    return (
        <VStack height="full" w="full" mt={100} align="center">
            <UserSearchInput onChange={handleChange} isLoading={isLoading} errorMessage={error}
                             onSearch={handleSearch}/>
        </VStack>
    );
}

export default LandingPage;
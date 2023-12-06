import {VStack} from "@chakra-ui/layout";
import UserSearchInput from "../components/UserSearchInput.tsx";
import {useNavigate} from "react-router-dom";
import {getUsers} from "../services/githubService.ts";
import {useFetch} from "../hooks/useFetch.ts";
import {GitHubUser} from "../models/GitHubUser.ts";
import {OctokitResponse} from "@octokit/types";

const LandingPage = () => {

    const {isLoading, error, fetchData, setError} = useFetch<OctokitResponse<GitHubUser>>();

    const navigate = useNavigate();

    const handleSearch = async (username: string) => {
        if (username.trim() === "") {
            setError("Username must be set!");
            return;
        }
        const data = await fetchData(() => getUsers(username), `No user with name ${username}.`);
        if (data) {
            navigate(`/repositories/${data.data.login}`)
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
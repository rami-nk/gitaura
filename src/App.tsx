import {useState} from 'react';
import './App.scss'
import {
    Stack,
    VStack,
    Text,
    Card,
    CardHeader,
    Heading,
    CardBody,
    Link,
    Circle,
    HStack,
    Flex
} from "@chakra-ui/react";
import UserSearchInput from "./components/UserSearchInput.tsx";
import {GitHubUser} from "./models/GitHubUser.ts";
import Header from './components/Header.tsx';
import {getRepositories, getUsers} from "./services/githubService.ts";
import {AiOutlineFork, AiOutlineStar} from "react-icons/ai";
import {GoLaw} from "react-icons/go";
import {Repository} from "./models/Repository.ts";
import {timeAgo} from "./services/dateUtils.ts";
import {sanitizeClassName} from "./services/stringUtils.ts";

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
                        setIsLoading(false);
                        setRepositories([]);
                        setUserData(null);
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
                            <Card variant="elevated" w="full" key={repository.id} size="lg">
                                <CardHeader textAlign="left" p={4}>
                                    <Link isExternal href={repository.html_url}
                                          _hover={{color: "#539BF5", textDecoration: "underline"}} color="#539BF5"
                                          textAlign="left" size='md'>
                                        <Heading size="md">
                                            {repository.name}
                                        </Heading>
                                    </Link>
                                </CardHeader>
                                <CardBody p={4}>
                                    <VStack spacing={3} align="left">
                                        <Text textAlign="left">{repository.description}</Text>
                                        <Flex flexWrap="wrap" gap={4} align="center">
                                            {
                                                repository.language &&
                                                <HStack spacing={1} align="center">
                                                    <Circle size={2}
                                                            className={sanitizeClassName(repository.language)}/>
                                                    <Text fontSize="xs">{repository.language}</Text>
                                                </HStack>
                                            }
                                            {
                                                repository.stargazers_count !== 0 &&
                                                <HStack spacing={0.75} align="center">
                                                    <AiOutlineStar color="#768390" size={20}/>
                                                    <Text color="#768390"
                                                          fontSize="xs">{repository.stargazers_count}</Text>
                                                </HStack>
                                            }
                                            {
                                                repository.forks_count !== 0 &&
                                                <HStack spacing={0.75} align="center">
                                                    <AiOutlineFork color="#768390" size={20}/>
                                                    <Text color="#768390" fontSize="xs">{repository.forks_count}</Text>
                                                </HStack>
                                            }
                                            {
                                                repository.license &&
                                                <HStack spacing={1} align="center">
                                                    <GoLaw color="#768390" size={20}/>
                                                    <Text color="#768390" fontSize="xs">{repository.license.name}</Text>
                                                </HStack>
                                            }
                                            {
                                                repository.updated_at &&
                                                <Text color="#768390"
                                                      fontSize="xs">{timeAgo(repository.updated_at)}</Text>
                                            }
                                        </Flex>
                                    </VStack>
                                </CardBody>
                            </Card>)
                    }
                    {
                      !isLoading && !error && userData && repositories.length === 0 &&
                        <Text>{"No public repositories found!"}</Text>
                    }
                </VStack>
            </VStack>
        </Stack>
    )
}

export default App
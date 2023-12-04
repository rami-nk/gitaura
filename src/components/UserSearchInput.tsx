import {
    FormControl,
    FormErrorMessage,
    FormHelperText, IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement
} from "@chakra-ui/react";
import React, {ChangeEvent, FormEvent, useState} from "react";
import {GitHubUser} from "../models/GitHubUser.ts";
import {getUsers} from "../services/githubService.ts";
import {AiFillGithub} from "react-icons/ai";
import {BsArrowRightCircleFill} from "react-icons/bs";

interface UserSearchInputProps {
    onSearch: (user: GitHubUser | null) => void;
}

const UserSearchInput: React.FC<UserSearchInputProps> = (props) => {

    const [username, setUsername] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        getUsers(username)
            .then(response => {
                props.onSearch(response.data)
                setIsLoading(false);
            })
            .catch(_ => {
                setError(`No github user called ${username}. Try again!`)
                setIsLoading(false);
            });
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value)
        setError("");
    }

    return <form style={{width: "fit-content"}} onSubmit={handleFormSubmit}>
        <FormControl isInvalid={error !== ""}>
            <InputGroup size='lg'>

                <InputLeftElement>
                    <AiFillGithub size={25}/>
                </InputLeftElement>

                <InputRightElement>
                    <IconButton isLoading={isLoading}
                                isRound={true}
                                variant='solid'
                                type="submit"
                                icon={<BsArrowRightCircleFill size={20}/>}
                                aria-label="load-user">
                    </IconButton>
                </InputRightElement>
                <Input placeholder="ThePrimeagen"
                       onChange={handleChange}/>
            </InputGroup>
            {!error ?
                <FormHelperText>Enter a GitHub username</FormHelperText>
                :
                <FormErrorMessage>{error}</FormErrorMessage>
            }
        </FormControl>
    </form>;
}

export default UserSearchInput;
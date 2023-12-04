import {FormControl, FormErrorMessage, FormHelperText, Input} from "@chakra-ui/react";
import React, {ChangeEvent, FormEvent, useState} from "react";
import {GitHubUser} from "../models/GitHubUser.ts";
import {getUsers} from "../services/githubService.ts";

interface UserSearchInputProps {
    onSearch: (user: GitHubUser) => void;
}

const UserSearchInput: React.FC<UserSearchInputProps> = (props) =>  {

    const [username, setUsername] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        getUsers(username)
            .then(response => props.onSearch(response.data))
            .catch(_ => {
                setError(`No github user called ${username}. Try again!`)
            });
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value)
        setError("");
    }

    return <form onSubmit={handleSubmit}>
        <FormControl isInvalid={error !== ""}>
            <Input placeholder="ThePrimeagen"
                   onChange={handleChange}
            />
            {!error ?
                <FormHelperText>Enter a GitHub username</FormHelperText>
                :
                <FormErrorMessage>{error}</FormErrorMessage>
            }
        </FormControl>
    </form>;
}

export default UserSearchInput;
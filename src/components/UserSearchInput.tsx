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
import {AiFillGithub} from "react-icons/ai";
import {BsArrowRightCircleFill} from "react-icons/bs";

interface UserSearchInputProps {
    onSearch: (username: string) => void;
    onChange?: () => void;
    isLoading: boolean;
    errorMessage?: string;
}

const UserSearchInput: React.FC<UserSearchInputProps> = (props) => {

    const [username, setUsername] = useState<string>('');

    const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.onSearch(username);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value)
        props.onChange && props.onChange();
    }

    return <form autoComplete="off" style={{width: "fit-content"}} onSubmit={handleFormSubmit}>
        <FormControl isInvalid={props.errorMessage !== undefined && props.errorMessage !== ""}>
            <InputGroup mb={5} size='lg'>

                <InputLeftElement>
                    <AiFillGithub size={25}/>
                </InputLeftElement>

                <InputRightElement>
                    <IconButton isLoading={props.isLoading}
                                data-testid={props.isLoading ? "loading-spinner": ""}
                                isRound={true}
                                variant='solid'
                                type="submit"
                                icon={<BsArrowRightCircleFill size={20}/>}
                                aria-label="load-user">
                    </IconButton>
                </InputRightElement>
                <Input placeholder="ThePrimeagen"
                       _focusVisible={{boxShadow: "0 0 0 1px white"}}
                       onChange={handleChange}/>
            </InputGroup>
            {!props.errorMessage ?
                <FormHelperText textAlign="center">Enter a GitHub username to explore his repositories!</FormHelperText>
                :
                <FormErrorMessage justifyContent="center">{props.errorMessage}</FormErrorMessage>
            }
        </FormControl>
    </form>;
}

export default UserSearchInput;
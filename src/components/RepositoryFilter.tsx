import {Flex, FormControl, Input, InputGroup, InputLeftElement, Select} from "@chakra-ui/react";
import React, {ChangeEvent, FormEvent, useState} from "react";
import {GoRepo} from "react-icons/go";

interface RepositorySearchFilter {
    onFilter: (searchString: string, language: string) => void;
    languages: string[];
}

const RepositoryFilter: React.FC<RepositorySearchFilter> = (props) => {

    const [searchString, setSearchString] = useState<string>("");
    const [selectedLanguage, setSelectedLanguage] = useState<string>("");

    const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.onFilter(searchString, selectedLanguage);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchString(event.target.value)
    }

    const handleSelectLanguage = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedLanguage(event.target.value);
        props.onFilter(searchString, event.target.value);
    }

    return (
        <form style={{width: "100%"}} onSubmit={handleFormSubmit}>
            <FormControl>
                <Flex gap={2} justifyContent="center">
                    <InputGroup flex="0 0 80%">
                        <InputLeftElement>
                            <GoRepo size={18}/>
                        </InputLeftElement>

                        <Input id="repo-filter-input"
                               _focusVisible={{boxShadow: "0 0 0 1px white"}}
                               placeholder={"Find a repository..."} onChange={handleChange}/>
                    </InputGroup>
                    <Select id="repo-filter-select"
                            _focusVisible={{boxShadow: "0 0 0 1px white"}}
                            onChange={handleSelectLanguage} flex="0 0 20%" placeholder='Language' size='md'>
                        {
                            props.languages.map(language =>
                                <option key={language} value={language}>{language}</option>
                            )
                        }
                    </Select>
                </Flex>
            </FormControl>
        </form>
    );
}

export default RepositoryFilter;
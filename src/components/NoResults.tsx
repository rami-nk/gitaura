import {Text} from "@chakra-ui/react";
import React from "react";

interface NoResultsProps {
    message: string;
}

const NoResults: React.FC<NoResultsProps> = (props) => {
    return (<Text fontWeight="bold">{props.message}</Text>);
};

export default NoResults;
import {Card, CardBody, CardHeader, Circle, Flex, Heading, HStack, Link, Text, VStack} from "@chakra-ui/react";
import {sanitizeClassName} from "../services/stringUtils.ts";
import {AiOutlineFork, AiOutlineStar} from "react-icons/ai";
import {GoLaw} from "react-icons/go";
import {timeAgo} from "../services/dateUtils.ts";
import {Repository} from "../models/Repository.ts";
import React from "react";

interface RepositoryCardProps {
    repository: Repository;
}

const RepositoryCard: React.FC<RepositoryCardProps> = (props) => {
    return (
        <Card variant="elevated" w="full" key={props.repository.id} size="lg">
        <CardHeader textAlign="left" p={4}>
            <Link isExternal href={props.repository.html_url}
                  _hover={{color: "#539BF5", textDecoration: "underline"}} color="#539BF5"
                  textAlign="left" size='md'>
                <Heading size="md">
                    {props.repository.name}
                </Heading>
            </Link>
        </CardHeader>
        <CardBody p={4}>
            <VStack spacing={3} align="left">
                <Text textAlign="left">{props.repository.description}</Text>
                <Flex flexWrap="wrap" gap={4} align="center">
                    {
                        props.repository.language &&
                        <HStack color="card.100" spacing={1} align="center">
                            <Circle size={2}
                                    className={sanitizeClassName(props.repository.language)}/>
                            <Text fontSize="xs">{props.repository.language}</Text>
                        </HStack>
                    }
                    {
                        props.repository.stargazers_count !== 0 &&
                        <HStack color="card.100" spacing={0.75} align="center">
                            <AiOutlineStar size={20}/>
                            <Text fontSize="xs">{props.repository.stargazers_count}</Text>
                        </HStack>
                    }
                    {
                        props.repository.forks_count !== 0 &&
                        <HStack color="card.100" spacing={0.75} align="center">
                            <AiOutlineFork size={20}/>
                            <Text fontSize="xs">{props.repository.forks_count}</Text>
                        </HStack>
                    }
                    {
                        props.repository.license &&
                        <HStack spacing={1} align="center">
                            <GoLaw color="card.100" size={20}/>
                            <Text color="card.100" fontSize="xs">{props.repository.license.name}</Text>
                        </HStack>
                    }
                    {
                        props.repository.updated_at &&
                        <Text color="#768390"
                              fontSize="xs">{timeAgo(props.repository.updated_at)}</Text>
                    }
                </Flex>
            </VStack>
        </CardBody>
    </Card>)
}

export default RepositoryCard;
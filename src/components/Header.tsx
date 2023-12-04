import {Flex, Heading} from "@chakra-ui/react";

const Header = () => {
    return (
        <Flex as="header" justify="center" py={3}>
            <Heading>GitAura</Heading>
        </Flex>
    );
};

export default Header;
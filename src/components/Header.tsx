import {Button, Flex, Heading} from "@chakra-ui/react";
import {Link, useLocation} from "react-router-dom";
import {BsArrowLeft} from "react-icons/bs";

const Header = () => {
    const location = useLocation();

    const showBackButton = location.pathname !== '/';

    return (
        <Flex as="header" position="relative" justifyContent="center" alignItems="center" py={3}>
            <Heading textAlign="center">GitAura</Heading>
            {
                showBackButton &&
                <Link style={{position: "absolute", left: 0}} to="//">
                    <Button leftIcon={<BsArrowLeft/>}></Button>
                </Link>
            }
        </Flex>
    );
};

export default Header;
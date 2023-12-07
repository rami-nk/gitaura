import {Button, Flex, Heading, useColorMode} from "@chakra-ui/react";
import {Link, useLocation} from "react-router-dom";
import {BsArrowLeft} from "react-icons/bs";
import {MdDarkMode, MdOutlineLightMode} from "react-icons/md";

const Header = () => {
    const location = useLocation();
    const {colorMode, toggleColorMode} = useColorMode();

    const isNotLandingPage = location.pathname !== '/';

    return (
        <Flex as="header" position="relative" justifyContent="center" alignItems="center" py={3}>
            <Heading fontSize={isNotLandingPage ? 40 : 80} textAlign="center">GitAura</Heading>
            {
                isNotLandingPage &&
                <Link style={{position: "absolute", left: 0}} to="/">
                    <Button leftIcon={<BsArrowLeft/>}></Button>
                </Link>
            }
            <Button _hover={{background: "none", border: "none"}}
                    _focus={{outline: "none", boxShadow: "none"}}
                    onClick={toggleColorMode} background="none"
                    style={{position: "absolute", right: 0, top: !isNotLandingPage ? 0 : "unset"}}>
                {
                    colorMode === "light" ?
                        <MdDarkMode/> :
                        <MdOutlineLightMode/>
                }
            </Button>
        </Flex>
    );
};

export default Header;
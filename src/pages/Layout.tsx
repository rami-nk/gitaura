import {Stack} from "@chakra-ui/react";
import Header from "../components/Header.tsx";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <Stack height="100%" spacing={2}>
            <Header/>
            <Outlet/>
        </Stack>
    );
}

export default Layout;
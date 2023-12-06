import {Stack} from "@chakra-ui/react";
import Header from "../components/Header.tsx";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <Stack spacing={2}>
            <Header/>
            <Outlet/>
        </Stack>
    );
}

export default Layout;
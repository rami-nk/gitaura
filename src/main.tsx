import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import {ChakraProvider, ColorModeScript} from '@chakra-ui/react'
import theme from "./theme.ts";
import {RouterProvider} from "react-router-dom";
import {router} from "./router.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <>
        <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
        <React.StrictMode>
            <ChakraProvider theme={theme}>
                <RouterProvider router={router}/>
            </ChakraProvider>
        </React.StrictMode>
    </>
);
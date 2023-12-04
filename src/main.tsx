import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import {ChakraProvider, ColorModeScript} from '@chakra-ui/react'
import theme from "./theme.ts";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <>
        <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
        <React.StrictMode>
            <ChakraProvider theme={theme}>
                <App/>
            </ChakraProvider>
        </React.StrictMode>
    </>
)

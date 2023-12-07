import {extendTheme, type ThemeConfig} from '@chakra-ui/react'
import { mode } from "@chakra-ui/theme-tools";
import type { StyleFunctionProps } from '@chakra-ui/styled-system'

const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
}

const theme = extendTheme({config}, {
    components: {
        Input: {
            baseStyle: (props: StyleFunctionProps) => ({
                field: {
                    backdropFilter: "blur(1px)",
                    boxShadow: mode("0 0 15px 1px black", "0 0 15px 1px white")(props),
                    _focusVisible: {
                        boxShadow: mode("0 0 20px 1px black", "0 0 20px 1px white")(props) + " !important",
                    },
                },
            }),
        },
        Select: {
            baseStyle: (props: StyleFunctionProps) => ({
                field: {
                    backdropFilter: "blur(1px)",
                    boxShadow: mode("0 0 15px 1px black", "0 0 15px 1px white")(props),
                    _focusVisible: {
                        boxShadow: mode("0 0 20px 1px black", "0 0 20px 1px white")(props) + " !important",
                    },
                },
            }),
        }
    },
    colors: {
        card: {
            100: "#768390",
        },
        link: {
            100: "#539BF5",
        },
    },
});

export default theme;
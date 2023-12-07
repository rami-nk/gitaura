import {extendTheme, type ThemeConfig} from '@chakra-ui/react'

const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
}

const theme = extendTheme({config}, {
    components: {
        Input: {
            baseStyle: {
                field: {
                    backdropFilter: "blur(1px)",
                    boxShadow: "0 0 15px 1px white",
                    _focusVisible: {boxShadow: "0 0 20px 1px white !important"}
                },
            },
        },
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
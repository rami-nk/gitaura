import {extendTheme, type ThemeConfig} from '@chakra-ui/react'

const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
}

const theme = extendTheme({config},
    {
        colors: {
            card: {
                100: "#768390"
            },
            link: {
                100: "#539BF5"
            }
        },
    }
)

export default theme
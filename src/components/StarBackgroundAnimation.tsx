import "../stars_animation.scss";
import {useColorMode} from "@chakra-ui/react";

const StarBackgroundAnimation = () => {
    const {colorMode} = useColorMode();

    return (
        <div className={`starAnimation ${colorMode}`}>
            <div id="stars"></div>
            <div id="stars2"></div>
            <div id="stars3"></div>
        </div>
    )
}

export default StarBackgroundAnimation;
import React from 'react';
import ReactNative, { useColorScheme } from 'react-native';
import Colors from '../../styles/colors';
import Fonts from '../../styles/fonts';

const LiText = props => {
    const isDarkMode = useColorScheme() === 'dark';

    const color = () => {
        if (props.color) {
            return props.color;
        }
        return isDarkMode ? Colors.white._0 : Colors.black._100;
    };

    const textStyle = {
        color: color(),
        fontSize: props.fontSize ? props.fontSize : Fonts.size.md,
        fontFamily: 'Roboto',
        ...props.style
    };

    return (
        <ReactNative.Text {...props} style={textStyle}>
            {props.children}
        </ReactNative.Text>
    );
};

export default LiText;

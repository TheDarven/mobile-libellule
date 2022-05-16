import React from 'react';
import ReactNative, { useColorScheme } from 'react-native';
import Colors from '../../styles/colors';
import Fonts from '../../styles/fonts';

const Text = ({ children, fontSize, style }) => {
    const isDarkMode = useColorScheme() === 'dark';

    const textStyle = {
        ...style,
        color: isDarkMode ? Colors.white._0 : Colors.black._100,
        fontSize: fontSize ? fontSize : Fonts.size.md,
        fontFamily: 'Roboto'
    };

    return <ReactNative.Text style={textStyle}>{children}</ReactNative.Text>;
};

export default Text;

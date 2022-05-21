import React from 'react';
import ReactNative, { useColorScheme } from 'react-native';
import Colors from '../../styles/colors';
import Fonts from '../../styles/fonts';

const LiText = ({ children, fontSize, style }) => {
    const isDarkMode = useColorScheme() === 'dark';

    const textStyle = {
        color: isDarkMode ? Colors.white._0 : Colors.black._100,
        fontSize: fontSize ? fontSize : Fonts.size.md,
        fontFamily: 'Roboto',
        ...style
    };

    return <ReactNative.Text style={textStyle}>{children}</ReactNative.Text>;
};

export default LiText;

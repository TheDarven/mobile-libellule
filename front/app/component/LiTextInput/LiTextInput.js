import React, { useState } from 'react';
import { TextInput, useColorScheme } from 'react-native';
import Colors, { AppBackgroundColor } from '../../styles/colors';
import Fonts from '../../styles/fonts';
import Spacings from '../../styles/spacings';
import Borders from '../../styles/borders';

const LiTextInput = props => {
    const [isFocus, setIsFocus] = useState(false);

    function onFocus(event) {
        if (props.onFocus != null) {
            props.onFocus(event);
        }
        setIsFocus(true);
    }

    function onBlur(event) {
        if (props.onBlur != null) {
            props.onBlur(event);
        }
        setIsFocus(false);
    }

    const borderColor = () => {
        if (isFocus) {
            return isDarkMode ? Colors.black._80 : Colors.white._80;
        }
        return isDarkMode ? AppBackgroundColor.dark : AppBackgroundColor.light;
    };

    const isDarkMode = useColorScheme() === 'dark';

    const style = {
        borderWidth: 1,
        paddingHorizontal: Spacings._16,
        paddingVertical: Spacings._12,
        borderRadius: Borders.radius._4,
        borderColor: borderColor(),
        color: isDarkMode ? Colors.white._0 : Colors.black._100,
        backgroundColor: isDarkMode ? Colors.black._100 : Colors.white._0,
        width: '100%',
        fontSize: Fonts.size.md
    };

    const placeholderTextColor =
        props.placeholderTextColor ?? isDarkMode
            ? Colors.black._20
            : Colors.black._0;

    return (
        <TextInput
            {...props}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholderTextColor={placeholderTextColor}
            style={{ ...style, ...props.style }}
        />
    );
};

export default LiTextInput;

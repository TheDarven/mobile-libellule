import { useColorScheme, View } from 'react-native';
import React from 'react';
import LiViewStyle from './LiViewStyle';
import { AppBackgroundColor } from '../../styles/colors';

const LiMainView = props => {
    const isDarkMode = useColorScheme() === 'dark';

    const mergeStyle = {
        ...LiViewStyle,
        backgroundColor: isDarkMode
            ? AppBackgroundColor.dark
            : AppBackgroundColor.light,
        ...props.style
    };

    return (
        <View {...props} style={mergeStyle}>
            {props.children}
        </View>
    );
};

export default LiMainView;

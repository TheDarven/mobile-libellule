import { useColorScheme, View } from 'react-native';
import React from 'react';
import LiViewStyle from './LiViewStyle';
import { AppBackgroundColor } from '../../styles/colors';

export const MainContent = {
    none: 'none',
    default: 'default',
    card: 'card'
};

const LiMainView = props => {
    const isDarkMode = useColorScheme() === 'dark';

    const type = props.type ?? MainContent.default;

    const mergeStyle = {
        ...LiViewStyle[type],
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

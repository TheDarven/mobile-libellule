import { ScrollView, useColorScheme } from 'react-native';
import React from 'react';
import LiViewStyle from '../LiMainView/LiViewStyle';
import { AppBackgroundColor } from '../../styles/colors';

const LiMainScrollView = props => {
    const isDarkMode = useColorScheme() === 'dark';

    const mergeStyle = {
        ...LiViewStyle,
        backgroundColor: isDarkMode
            ? AppBackgroundColor.dark
            : AppBackgroundColor.light,
        ...props.style
    };

    return (
        <ScrollView {...props} style={mergeStyle}>
            {props.children}
        </ScrollView>
    );
};

export default LiMainScrollView;

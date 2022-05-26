import { ScrollView, useColorScheme } from 'react-native';
import React from 'react';
import LiViewStyle from '../LiMainView/LiViewStyle';
import { AppBackgroundColor } from '../../styles/colors';
import { MainContent } from '../LiMainView/LiMainView';

const LiMainScrollView = props => {
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
        <ScrollView {...props} style={mergeStyle}>
            {props.children}
        </ScrollView>
    );
};

export default LiMainScrollView;

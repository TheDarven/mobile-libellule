import React from 'react';
import { FlatList, useColorScheme } from 'react-native';
import LiViewStyle from '../LiMainView/LiViewStyle';
import { AppBackgroundColor } from '../../styles/colors';
import { MainContent } from '../LiMainView/LiMainView';

const LiMainFlatList = props => {
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
        <FlatList
            {...props}
            data={props.data}
            renderItem={props.renderItem}
            style={mergeStyle}
        />
    );
};

export default LiMainFlatList;

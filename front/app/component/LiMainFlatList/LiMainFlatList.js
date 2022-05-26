import React from 'react';
import { FlatList, useColorScheme } from 'react-native';
import LiViewStyle from '../LiMainView/LiViewStyle';
import { AppBackgroundColor } from '../../styles/colors';

const LiMainFlatList = props => {
    const isDarkMode = useColorScheme() === 'dark';

    const mergeStyle = {
        ...LiViewStyle,
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

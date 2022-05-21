import React from 'react';
import { View } from 'react-native';
import styles from './MainLayoutStyle';

export const MainLayout = ({ children, style }) => {
    const mergeStyle = { ...styles.sectionContainer, ...style };

    return <View style={mergeStyle}>{children}</View>;
};

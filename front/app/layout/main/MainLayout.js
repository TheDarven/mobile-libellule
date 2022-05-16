import React from 'react';
import { View } from 'react-native';
import styles from './MainLayoutStyle';

export const MainLayout = ({ children }) => {
    return <View style={styles.sectionContainer}>{children}</View>;
};

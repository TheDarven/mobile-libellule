import React from 'react';
import Text from '../text/Text';
import { MainLayout } from '../../layout/main/MainLayout';
import { StyleSheet } from 'react-native';

const Section = ({ title, children }) => {
    return (
        <MainLayout>
            <Text style={styles.sectionTitle}>{title}</Text>
            <Text style={styles.sectionDescription}>{children}</Text>
        </MainLayout>
    );
};

const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600'
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400'
    }
});

export default Section;

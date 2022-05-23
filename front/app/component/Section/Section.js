import React from 'react';
import LiText from '../LiText/LiText';
import LiMainView from '../LiMainView/LiMainView';
import { StyleSheet } from 'react-native';

const Section = ({ title, children }) => {
    return (
        <LiMainView>
            <LiText style={styles.sectionTitle}>{title}</LiText>
            <LiText style={styles.sectionDescription}>{children}</LiText>
        </LiMainView>
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

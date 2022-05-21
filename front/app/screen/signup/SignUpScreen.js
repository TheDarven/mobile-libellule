import React from 'react';
import { View } from 'react-native';
import LiText from '../../component/LiText/LiText';

const SignUpScreen = () => {
    return (
        <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <LiText>Page d'inscription</LiText>
        </View>
    );
};

export default SignUpScreen;

import React, { useEffect, useState } from 'react';
import { MainLayout } from '../../layout/main/MainLayout';
import Spacings from '../../styles/spacings';
import LiTextInput from '../../component/LiTextInput/LiTextInput';
import LiPressable from '../../component/LiPressable/LiPressable';
import { View } from 'react-native';
import { nonEmptyOrNull } from '../../util/string-helper';
import Toast from 'react-native-toast-message';
import { signUp } from '../../api/users-api';

const SignUpScreen = () => {
    const [name, setName] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [isFormValid, setIsFormValid] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);

    useEffect(() => {
        setIsFormValid(
            nonEmptyOrNull(password) &&
                nonEmptyOrNull(confirmPassword) &&
                nonEmptyOrNull(name)
        );
    }, [password, confirmPassword, name]);

    function onSignUpClicked() {
        if (password !== confirmPassword) {
            Toast.show({
                type: 'error',
                text1: 'Les champs de mot de passe ne sont pas identiques.',
                position: 'bottom'
            });
            return;
        }
        setIsRegistering(true);
        signUp(name, password)
            .then(res => {
                if (!res.data?.status) {
                    setIsRegistering(false);
                }
            })
            .catch(() => setIsRegistering(false));
    }

    return (
        <MainLayout
            style={{
                flex: 1,
                alignItems: 'center'
            }}>
            <LiTextInput
                placeholder="Pseudonyme"
                value={name}
                onChangeText={setName}
                style={{ marginTop: Spacings._64, marginBottom: Spacings._20 }}
            />
            <LiTextInput
                placeholder="Mot de passe"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                style={{ marginBottom: Spacings._20 }}
            />
            <LiTextInput
                placeholder="Confirmer le mot de passe"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={true}
                style={{ marginBottom: Spacings._24 }}
            />
            <View style={{ flex: 1, alignItems: 'flex-end', width: '100%' }}>
                <LiPressable
                    onPressIn={onSignUpClicked}
                    title="S'inscrire"
                    disable={!isFormValid || isRegistering}
                />
            </View>
        </MainLayout>
    );
};

export default SignUpScreen;

import React, { useEffect, useState } from 'react';
import { MainLayout } from '../../layout/main/MainLayout';
import LiTextInput from '../../component/LiTextInput/LiTextInput';
import { View } from 'react-native';
import Spacings from '../../styles/spacings';
import LiPressable from '../../component/LiPressable/LiPressable';
import { nonEmptyOrNull } from '../../util/string-helper';
import { login } from '../../api/users-api';

const LoginScreen = () => {
    const [name, setName] = useState(null);
    const [password, setPassword] = useState(null);
    const [isFormValid, setIsFormValid] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);

    useEffect(() => {
        setIsFormValid(nonEmptyOrNull(password) && nonEmptyOrNull(name));
    }, [password, name]);

    function onLoginClicked() {
        setIsConnecting(true);
        login(name, password)
            .then(res => {
                if (!res.data?.status) {
                    setIsConnecting(false);
                }
            })
            .catch(() => setIsConnecting(false));
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
                style={{ marginBottom: Spacings._24 }}
            />
            <View style={{ flex: 1, alignItems: 'flex-end', width: '100%' }}>
                <LiPressable
                    onPressIn={onLoginClicked}
                    title="Se connecter"
                    disable={!isFormValid || isConnecting}
                />
            </View>
        </MainLayout>
    );
};

export default LoginScreen;

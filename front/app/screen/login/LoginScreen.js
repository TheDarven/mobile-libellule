import React, { useEffect, useState } from 'react';
import LiMainView from '../../component/LiMainView/LiMainView';
import LiTextInput from '../../component/LiTextInput/LiTextInput';
import { View } from 'react-native';
import Spacings from '../../styles/spacings';
import LiPressable from '../../component/LiPressable/LiPressable';
import { nonEmptyOrNull } from '../../util/string-helper';
import { login } from '../../api/users-api';
import LiText from '../../component/LiText/LiText';
import Colors from '../../styles/colors';

const LoginScreen = ({ navigation }) => {
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
        <LiMainView
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
            <View style={{ alignItems: 'flex-end', width: '100%' }}>
                <LiPressable
                    onPressIn={onLoginClicked}
                    title="Se connecter"
                    disable={!isFormValid || isConnecting}
                />
            </View>
            <LiText
                style={{ marginTop: Spacings._32, color: Colors.warning._50 }}
                onPress={() => {
                    navigation.replace('SignUp');
                }}>
                Vous n'avez pas de compte ? S'inscrire
            </LiText>
        </LiMainView>
    );
};

export default LoginScreen;

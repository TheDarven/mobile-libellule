import { View } from 'react-native';
import Colors from '../styles/colors';
import Borders from '../styles/borders';
import Spacings from '../styles/spacings';
import LiText from '../component/LiText/LiText';
import Fonts from '../styles/fonts';
import React from 'react';

const successViewStyle = {
    borderRadius: Borders.radius._8,
    paddingHorizontal: Spacings._12,
    paddingVertical: Spacings._8,
    width: '80%'
};

const successTitleStyle = {
    marginBottom: Spacings._4
};

export default {
    success: props => (
        <View
            style={{
                ...successViewStyle,
                backgroundColor: Colors.success._20
            }}>
            <LiText
                style={{
                    ...successTitleStyle,
                    color: Colors.success._100
                }}>
                ✓ Succès
            </LiText>
            <LiText
                style={{ color: Colors.success._80 }}
                fontSize={Fonts.size.sm}>
                {props.text1}
            </LiText>
        </View>
    ),
    error: props => (
        <View
            style={{
                ...successViewStyle,
                backgroundColor: Colors.danger._20
            }}>
            <LiText
                style={{
                    ...successTitleStyle,
                    color: Colors.danger._50
                }}>
                ✗ Erreur
            </LiText>
            <LiText
                style={{ color: Colors.danger._100 }}
                fontSize={Fonts.size.sm}>
                {props.text1}
            </LiText>
        </View>
    )
};

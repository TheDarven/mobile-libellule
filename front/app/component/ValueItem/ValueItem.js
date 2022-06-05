import React from 'react';
import Spacings from '../../styles/spacings';
import LiText from '../LiText/LiText';
import { useColorScheme, View } from 'react-native';
import Colors from '../../styles/colors';

const ValueItem = ({ label, value }) => {
    const isDarkMode = useColorScheme() === 'dark';

    const iconColor = isDarkMode ? Colors.gray._0 : Colors.black._20;

    return (
        <View
            style={{
                flexDirection: 'row',
                marginBottom: Spacings._4,
                justifyContent: 'space-between'
            }}>
            <LiText>{label}</LiText>
            <LiText style={{ color: iconColor }}>{value}</LiText>
        </View>
    );
};

export default ValueItem;

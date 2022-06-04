import React from 'react';
import Spacings from '../../../styles/spacings';
import Fonts from '../../../styles/fonts';
import { useColorScheme, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LiText from '../../LiText/LiText';
import Colors from '../../../styles/colors';

const Reaction = ({ style, nbReactions }) => {
    const isDarkMode = useColorScheme() === 'dark';

    const iconColor = isDarkMode ? Colors.gray._0 : Colors.black._20;

    return (
        <View
            style={{
                paddingHorizontal: Spacings._12,
                paddingVertical: Spacings._8,
                flexDirection: 'row',
                ...style
            }}>
            <MaterialCommunityIcons
                name={'butterfly-outline'}
                size={Fonts.size.lg}
                color={iconColor}
            />
            <LiText style={{ color: iconColor, marginLeft: Spacings._8 }}>
                {nbReactions ?? 0}
            </LiText>
        </View>
    );
};

export default Reaction;

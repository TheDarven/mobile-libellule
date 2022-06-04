import React from 'react';
import Spacings from '../../../styles/spacings';
import { useColorScheme, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Fonts from '../../../styles/fonts';
import LiText from '../../LiText/LiText';
import Colors from '../../../styles/colors';

const FollowUp = ({ isFollowing, followClicked }) => {
    const isDarkMode = useColorScheme() === 'dark';

    const iconColor = isDarkMode ? Colors.gray._0 : Colors.black._20;

    const infoColor = isDarkMode ? Colors.black._20 : Colors.black._0;

    return (
        <View
            onTouchEnd={followClicked}
            style={{
                paddingHorizontal: Spacings._12,
                paddingVertical: Spacings._8,
                flexDirection: 'row'
            }}>
            <Feather
                name={isFollowing ? 'bell-off' : 'bell'}
                size={Fonts.size.lg}
                color={iconColor}
            />
            <LiText style={{ color: infoColor, marginLeft: Spacings._8 }}>
                {isFollowing ? 'Ne plus suivre' : 'Suivre'}
            </LiText>
        </View>
    );
};

export default FollowUp;

import React from 'react';
import Spacings from '../../../styles/spacings';
import { useColorScheme, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Fonts from '../../../styles/fonts';
import LiText from '../../LiText/LiText';
import Colors from '../../../styles/colors';

export const FollowType = {
    question: {
        follow: 'Suivre la question',
        unfollow: 'Ne plus suivre la question'
    },
    user: {
        follow: "Suivre l'utilisateur",
        unfollow: "Ne plus suivre l'utilisateur"
    }
};

const FollowUp = ({ isFollowing, followClicked, type }) => {
    const isDarkMode = useColorScheme() === 'dark';

    const iconColor = isDarkMode ? Colors.gray._0 : Colors.black._20;

    const infoColor = isDarkMode ? Colors.black._20 : Colors.black._0;

    const followType = type ?? FollowType.question;

    return (
        <View
            onTouchEnd={followClicked}
            style={{
                paddingHorizontal: Spacings._12,
                paddingVertical: Spacings._8,
                flexDirection: 'row',
                alignItems: 'center'
            }}>
            <Feather
                name={isFollowing ? 'bell-off' : 'bell'}
                size={Fonts.size.lg}
                color={iconColor}
            />
            <LiText
                style={{ color: infoColor, marginLeft: Spacings._8 }}
                fontSize={Fonts.size.sm}>
                {isFollowing ? followType.unfollow : followType.follow}
            </LiText>
        </View>
    );
};

export default FollowUp;

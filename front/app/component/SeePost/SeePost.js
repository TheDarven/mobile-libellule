import React from 'react';
import Spacings from '../../styles/spacings';
import Feather from 'react-native-vector-icons/Feather';
import Fonts from '../../styles/fonts';
import LiText from '../LiText/LiText';
import { useColorScheme, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../styles/colors';

const SeePost = ({ questionId, content, style }) => {
    const navigation = useNavigation();

    const isDarkMode = useColorScheme() === 'dark';

    const actionColor = isDarkMode ? Colors.gray._100 : Colors.black._0;

    return (
        <View
            onTouchEnd={() => {
                navigation.navigate('Question', {
                    questionId
                });
            }}
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: Spacings._12,
                paddingHorizontal: Spacings._16,
                ...style
            }}>
            <Feather name={'eye'} size={Fonts.size.lg} color={actionColor} />
            <LiText
                style={{ color: actionColor, marginLeft: Spacings._8 }}
                fontSize={Fonts.size.sm}>
                {content}
            </LiText>
        </View>
    );
};

export default SeePost;

import React from 'react';
import LiText from '../../LiText/LiText';
import Feather from 'react-native-vector-icons/Feather';
import Fonts from '../../../styles/fonts';
import { useColorScheme, View } from 'react-native';
import Spacings from '../../../styles/spacings';
import LiTitle from '../../LiTitle/LiTitle';
import PostDate from '../../Post/PostHeader/PostDate/PostDate';
import Colors from '../../../styles/colors';
import { useNavigation } from '@react-navigation/native';

const FollowQuestionAlert = ({
    updateDate,
    questionTitle,
    questionId,
    authorName,
    alerts
}) => {
    const isDarkMode = useColorScheme() === 'dark';

    const navigation = useNavigation();

    const infoColor = isDarkMode ? Colors.gray._0 : Colors.black._0;

    return (
        <View style={{ paddingBottom: Spacings._24 }}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: Spacings._4
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Feather name={'file-text'} size={Fonts.size.lg} />
                    <LiTitle
                        style={{
                            fontWeight: '700',
                            marginLeft: Spacings._8,
                            marginBottom: Spacings._0
                        }}
                        fontSize={Fonts.size.md}>
                        {questionTitle}
                    </LiTitle>
                </View>
                <PostDate date={updateDate} />
            </View>
            <LiText
                style={{ color: infoColor, paddingLeft: Spacings._16 }}
                fontSize={Fonts.size.md}>
                {alerts > 1
                    ? `• ${alerts} nouveaux commentaires`
                    : `• ${alerts} nouveau commentaire`}
            </LiText>
            <View style={{ flexDirection: 'row' }}>
                <View
                    onTouchEnd={() => {
                        navigation.navigate('Question', {
                            questionId
                        });
                    }}
                    style={{
                        paddingVertical: Spacings._12,
                        paddingRight: Spacings._12,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                    <Feather name={'eye'} size={Fonts.size.lg} />
                    <LiText
                        style={{ color: infoColor, marginLeft: Spacings._8 }}
                        fontSize={Fonts.size.sm}>
                        {alerts > 1
                            ? 'Voir les commentaires'
                            : 'Voir le commentaire'}
                    </LiText>
                </View>
            </View>
        </View>
    );
};

export default FollowQuestionAlert;

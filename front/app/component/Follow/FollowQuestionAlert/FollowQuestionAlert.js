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
import DeletePost from '../../Post/DeletePost/DeletePost';
import SeePost from '../../SeePost/SeePost';

const FollowQuestionAlert = ({
    updateDate,
    questionTitle,
    questionId,
    authorName,
    alerts
}) => {
    const isDarkMode = useColorScheme() === 'dark';

    const iconColor = isDarkMode ? Colors.white._0 : Colors.black._100;

    const commentsColors = isDarkMode ? Colors.gray._0 : Colors.black._50;

    return (
        <View style={{ paddingBottom: Spacings._32 }}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: Spacings._8
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Feather
                        name={'file-text'}
                        size={Fonts.size.lg}
                        color={iconColor}
                    />
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
                style={{ color: commentsColors, paddingLeft: Spacings._16 }}
                fontSize={Fonts.size.md}>
                {alerts > 1
                    ? `• ${alerts} nouveaux commentaires`
                    : `• ${alerts} nouveau commentaire`}
            </LiText>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                <SeePost
                    questionId={questionId}
                    content={
                        alerts > 1
                            ? 'Voir les commentaires'
                            : 'Voir le commentaire'
                    }
                    style={{
                        paddingLeft: Spacings._0
                    }}
                />
                <DeletePost />
            </View>
        </View>
    );
};

export default FollowQuestionAlert;

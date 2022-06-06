import React, { useEffect, useState } from 'react';
import Spacings from '../../../styles/spacings';
import { useColorScheme, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Fonts from '../../../styles/fonts';
import LiTitle from '../../LiTitle/LiTitle';
import PostDate from '../../Post/PostHeader/PostDate/PostDate';
import Colors from '../../../styles/colors';
import LiText from '../../LiText/LiText';
import { formatLength } from '../../../util/string-helper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DeletePost from '../../Post/DeletePost/DeletePost';
import { formatDate } from '../../../util/date-helper';
import SeePost from '../../SeePost/SeePost';

const FollowUserAlertType = {
    comment: 'comment',
    question: 'question'
};

const FollowUserAlert = ({
    userName,
    userId,
    updateDate,
    questions,
    comments,
    deleteFollowAlert
}) => {
    const [alerts, setAlerts] = useState([]);

    const [isDeleting, setIsDeleting] = useState(false);

    const isDarkMode = useColorScheme() === 'dark';

    const iconColor = isDarkMode ? Colors.white._0 : Colors.black._100;

    useEffect(() => {
        const newAlerts = [];
        let questionIndex = 0;
        let commentIndex = 0;
        while (
            questionIndex < questions.length ||
            commentIndex < comments.length
        ) {
            if (
                questionIndex === questions.length ||
                (commentIndex < comments.length &&
                    new Date(comments[commentIndex].creationDate) >
                        new Date(questions[questionIndex].creationDate))
            ) {
                newAlerts.push({
                    ...comments[commentIndex++],
                    type: FollowUserAlertType.comment
                });
            } else {
                newAlerts.push({
                    ...questions[questionIndex++],
                    type: FollowUserAlertType.question
                });
            }
        }
        setAlerts(newAlerts);
    }, [questions, comments]);

    const commentsColors = isDarkMode ? Colors.gray._0 : Colors.black._50;

    function onDeleteClicked() {
        if (isDeleting) {
            return;
        }
        setIsDeleting(true);
        deleteFollowAlert(userId)
            .then(() => setIsDeleting(false))
            .catch(() => setIsDeleting(false));
    }

    return (
        <View style={{ paddingBottom: Spacings._24 }}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: Spacings._12
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Feather
                        name={'user'}
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
                        {userName}
                    </LiTitle>
                </View>
                <PostDate date={updateDate} />
            </View>
            <View
                style={{
                    borderLeftWidth: 1,
                    borderLeftColor: Colors.gray._0
                }}>
                {alerts.map((alert, index) => (
                    <View
                        key={index}
                        style={{
                            paddingVertical: Spacings._12,
                            paddingBottom: Spacings._8,
                            paddingLeft: Spacings._16
                        }}>
                        <View
                            style={{
                                justifyContent: 'flex-end',
                                flexDirection: 'row'
                            }}>
                            <LiText
                                fontSize={Fonts.size.sm}
                                style={{
                                    opacity: 0.3,
                                    marginBottom: Spacings._8
                                }}>
                                {formatDate(alert.creationDate)}
                            </LiText>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                            {alert.type === FollowUserAlertType.comment ? (
                                <>
                                    <FontAwesome
                                        name={'comment-o'}
                                        size={Fonts.size.md}
                                        color={commentsColors}
                                    />
                                    <LiText
                                        style={{
                                            paddingLeft: Spacings._8,
                                            color: commentsColors
                                        }}>
                                        A posté un commentaire dans{' '}
                                        <LiText
                                            style={{
                                                fontFamily: 'Roboto-Medium'
                                            }}>
                                            {formatLength(
                                                alert.Question.title,
                                                100
                                            )}
                                        </LiText>
                                        {' :'}
                                    </LiText>
                                </>
                            ) : (
                                <>
                                    <Feather
                                        name={'file-text'}
                                        size={Fonts.size.md}
                                        color={commentsColors}
                                    />
                                    <LiText
                                        style={{
                                            paddingLeft: Spacings._8,
                                            color: commentsColors
                                        }}>
                                        A créé une question :{' '}
                                        <LiText
                                            style={{
                                                fontFamily: 'Roboto-Medium'
                                            }}>
                                            {formatLength(alert.title, 100)}
                                        </LiText>
                                    </LiText>
                                </>
                            )}
                        </View>
                        {alert.type === FollowUserAlertType.comment && (
                            <LiText style={{ marginTop: Spacings._8 }}>
                                {formatLength(alert.content, 200)}
                            </LiText>
                        )}
                        <SeePost
                            questionId={
                                alert.type === FollowUserAlertType.comment
                                    ? alert.Question.questionId
                                    : alert.questionId
                            }
                            content={
                                alert.type === FollowUserAlertType.comment
                                    ? 'Voir le commentaire'
                                    : 'Voir la question'
                            }
                            style={{ paddingLeft: Spacings._0 }}
                        />
                    </View>
                ))}
                <DeletePost
                    deletePost={onDeleteClicked}
                    style={isDeleting ? { opacity: 0.3 } : {}}
                />
            </View>
        </View>
    );
};

export default FollowUserAlert;

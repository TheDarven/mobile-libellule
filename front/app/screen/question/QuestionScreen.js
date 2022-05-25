import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, useColorScheme, View } from 'react-native';
import Colors, { AppBackgroundColor } from '../../styles/colors';
import Spacings from '../../styles/spacings';
import QuestionHeaderLayout from '../../layout/QuestionLayout/QuestionHeaderLayout/QuestionHeaderLayout';
import QuestionCommentsLayout from '../../layout/QuestionCommentsLayout/QuestionCommentsLayout';
import LiTitle from '../../component/LiTitle/LiTitle';
import LiText from '../../component/LiText/LiText';
import Fonts from '../../styles/fonts';
import LiTextInput from '../../component/LiTextInput/LiTextInput';
import LiPressable from '../../component/LiPressable/LiPressable';
import Borders from '../../styles/borders';
import LiSeparator from '../../component/LiSeparator/LiSeparator';
import { getQuestionById } from '../../api/questions-api';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useAuth } from '../../context/auth-context';

const QuestionScreen = ({ route }) => {
    const [question, setQuestion] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const { isAuth } = useAuth().authContext;

    useEffect(() => {
        if (isLoading) {
            getQuestionById(route.params.questionId)
                .then(res => {
                    setQuestion(res.data.data);
                    setIsLoading(false);
                })
                .catch(() => setIsLoading(false));
        }
    }, [isLoading, route.params.questionId]);

    function onRefresh() {
        setIsLoading(true);
    }

    const comments = [
        {
            commentId: 1,
            author: 'Paul',
            content:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias assumenda id recusandae totam voluptas. Ad adipisci architecto dolorum incidunt laboriosam non officiis perspiciatis quidem, quisquam similique soluta, voluptatibus. Quia, repellendus.',
            date: '2022-05-25T18:31:49.000Z'
        },
        {
            commentId: 2,
            author: 'John Doe',
            content: 'Un commentaire !',
            date: '2022-05-25T18:31:49.000Z'
        },
        {
            commentId: 3,
            author: 'Paul',
            content:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias assumenda id recusandae totam voluptas. Ad adipisci architecto dolorum incidunt laboriosam non officiis perspiciatis quidem, quisquam similique soluta, voluptatibus. Quia, repellendus.',
            date: '2022-05-25T18:31:49.000Z'
        },
        {
            commentId: 4,
            author: 'John Doe',
            content: 'Un commentaire !',
            date: '2022-05-25T18:31:49.000Z'
        },
        {
            commentId: 5,
            author: 'Louis',
            content: 'Dernier commentaire',
            date: '2022-05-25T18:31:49.000Z'
        }
    ];

    const isDarkMode = useColorScheme() === 'dark';

    const questionNotExistColor = isDarkMode
        ? Colors.warning._20
        : Colors.warning._50;

    const viewStyle = {
        backgroundColor: isDarkMode ? Colors.black._100 : Colors.white._0,
        paddingHorizontal: Spacings._20,
        paddingVertical: Spacings._16
    };

    const contentTextStyle = {
        marginBottom: Spacings._16,
        color: isDarkMode ? Colors.gray._0 : Colors.black._50
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={isLoading}
                        onRefresh={onRefresh}
                    />
                }
                style={viewStyle}
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingBottom: Spacings._8
                }}>
                {isLoading || question == null ? (
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        {isLoading ? (
                            <LiText>Chargement de la question…</LiText>
                        ) : (
                            <>
                                <FontAwesome
                                    name={'bug'}
                                    size={96}
                                    color={questionNotExistColor}
                                />
                                <LiText style={{ marginTop: Spacings._16 }}>
                                    La question n'existe pas ou plus
                                </LiText>
                            </>
                        )}
                    </View>
                ) : (
                    <>
                        <LiTitle fontSize={Fonts.size.xl_2}>
                            {question.title}
                        </LiTitle>
                        <QuestionHeaderLayout
                            author={question.User.display_name}
                            date={question.creation_date}
                        />
                        <LiText style={contentTextStyle}>
                            {question.content}
                        </LiText>
                        <LiSeparator
                            style={{
                                marginTop: Spacings._20,
                                marginBottom: Spacings._24
                            }}
                        />
                        <LiTitle fontSize={Fonts.size.xl}>Commentaires</LiTitle>
                        <QuestionCommentsLayout comments={comments} />
                    </>
                )}
            </ScrollView>
            {!isLoading && question != null && isAuth() && (
                <View
                    style={{
                        paddingHorizontal: Spacings._12,
                        paddingVertical: Spacings._12,
                        backgroundColor: isDarkMode
                            ? AppBackgroundColor.dark
                            : Colors.white._50,
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderRadius: Borders.radius._4,
                        shadowColor: '#000'
                    }}>
                    <View style={{ flex: 1, marginRight: Spacings._12 }}>
                        <LiTextInput
                            multiline={true}
                            numberOfLines={2}
                            style={{
                                textAlignVertical: 'top',
                                paddingBottom: Spacings._4,
                                paddingTop: Spacings._12
                            }}
                            placeholderTextColor={'Votre commentaire ici..'}
                        />
                    </View>
                    <LiPressable title={'Poster'} />
                </View>
            )}
        </View>
    );
};

export default QuestionScreen;

import React, { useEffect, useState } from 'react';
import { RefreshControl, useColorScheme, View } from 'react-native';
import Colors, { AppBackgroundColor } from '../../styles/colors';
import Spacings from '../../styles/spacings';
import PostHeader from '../../component/Post/PostHeader/PostHeader';
import LiTitle from '../../component/LiTitle/LiTitle';
import LiText from '../../component/LiText/LiText';
import Fonts from '../../styles/fonts';
import LiTextInput from '../../component/LiTextInput/LiTextInput';
import LiPressable from '../../component/LiPressable/LiPressable';
import Borders from '../../styles/borders';
import LiSeparator from '../../component/LiSeparator/LiSeparator';
import { getQuestionById } from '../../api/questions-api';
import { useAuth } from '../../context/auth-context';
import LiMainFlatList from '../../component/LiMainFlatList/LiMainFlatList';
import CommentLayout from '../../layout/CommentLayout/CommentLayout';
import QuestionEmptyOrLoad from '../../layout/QuestionLayout/QuestionEmptyOrLoad/QuestionEmptyOrLoad';

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

    const commentsViewStyle = {
        backgroundColor: isDarkMode ? Colors.black._100 : Colors.white._0,
        paddingHorizontal: Spacings._20,
        paddingVertical: Spacings._16
    };

    const contentTextStyle = {
        marginBottom: Spacings._16,
        color: isDarkMode ? Colors.gray._0 : Colors.black._50
    };

    const newCommentViewStyle = {
        paddingHorizontal: Spacings._12,
        paddingVertical: Spacings._12,
        backgroundColor: isDarkMode
            ? AppBackgroundColor.dark
            : Colors.white._50,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: Borders.radius._4,
        shadowColor: '#000'
    };

    const newCommentInputViewStyle = {
        flex: 1,
        marginRight: Spacings._12
    };

    const newCommentInputStyle = {
        textAlignVertical: 'top',
        paddingBottom: Spacings._4,
        paddingTop: Spacings._12
    };

    function renderComment(item) {
        const { index } = item;
        const comment = item.item;
        return (
            <CommentLayout
                key={index}
                content={comment.content}
                author={comment.author}
                date={comment.date}
            />
        );
    }

    function renderHeader() {
        return (
            <>
                <LiTitle fontSize={Fonts.size.xl_2}>{question.title}</LiTitle>
                <PostHeader
                    author={question.User.display_name}
                    date={question.creation_date}
                />
                <LiText style={contentTextStyle}>{question.content}</LiText>
                <LiSeparator
                    style={{
                        marginTop: Spacings._20,
                        marginBottom: Spacings._24
                    }}
                />
                <LiTitle
                    fontSize={Fonts.size.xl}
                    style={{ paddingBottom: Spacings._4 }}>
                    Commentaires
                </LiTitle>
            </>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            {isLoading || question == null ? (
                <QuestionEmptyOrLoad isLoading={isLoading} />
            ) : (
                <>
                    <LiMainFlatList
                        refreshControl={
                            <RefreshControl
                                refreshing={isLoading}
                                onRefresh={onRefresh}
                            />
                        }
                        style={commentsViewStyle}
                        ListEmptyComponent={() => (
                            <LiText>Aucun commentaire</LiText>
                        )}
                        ListHeaderComponent={renderHeader}
                        contentContainerStyle={{
                            flexGrow: 1,
                            paddingBottom: Spacings._8
                        }}
                        data={comments}
                        renderItem={renderComment}
                    />
                    {isAuth() && (
                        <View style={newCommentViewStyle}>
                            <View style={newCommentInputViewStyle}>
                                <LiTextInput
                                    multiline={true}
                                    numberOfLines={2}
                                    style={newCommentInputStyle}
                                    placeholder={'Votre commentaire ici..'}
                                />
                            </View>
                            <LiPressable title={'Poster'} />
                        </View>
                    )}
                </>
            )}
        </View>
    );
};

export default QuestionScreen;

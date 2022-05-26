import React, { useEffect, useState } from 'react';
import { RefreshControl, useColorScheme, View } from 'react-native';
import Colors from '../../styles/colors';
import Spacings from '../../styles/spacings';
import LiText from '../../component/LiText/LiText';
import { getQuestionById } from '../../api/questions-api';
import { useAuth } from '../../context/auth-context';
import QuestionEmptyOrLoad from '../../layout/QuestionLayout/QuestionEmptyOrLoad/QuestionEmptyOrLoad';
import LiMainFlatList from '../../component/LiMainFlatList/LiMainFlatList';
import NewComment from '../../layout/CommentLayout/NewComment/NewComment';
import QuestionLayout from '../../layout/QuestionLayout/QuestionLayout';
import CommentItem from '../../layout/QuestionLayout/CommentItem/CommentItem';

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

    const viewStyle = {
        flex: 1
    };

    const commentsViewStyle = {
        backgroundColor: isDarkMode ? Colors.black._100 : Colors.white._0,
        paddingHorizontal: Spacings._20,
        paddingVertical: Spacings._16
    };

    const commentsContainerStyle = {
        flexGrow: 1,
        paddingBottom: Spacings._8
    };

    return (
        <View style={viewStyle}>
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
                        ListHeaderComponent={() => (
                            <QuestionLayout
                                questionId={question.id}
                                title={question.title}
                                content={question.content}
                                author={question.User.display_name}
                                creationDate={question.creation_date}
                            />
                        )}
                        contentContainerStyle={commentsContainerStyle}
                        data={comments}
                        renderItem={item => <CommentItem item={item} />}
                    />
                    {isAuth() && <NewComment />}
                </>
            )}
        </View>
    );
};

export default QuestionScreen;

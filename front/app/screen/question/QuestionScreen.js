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
import { getCommentsOfQuestion } from '../../api/comments-api';

const QuestionScreen = ({ route }) => {
    const [question, setQuestion] = useState(null);
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { isAuth } = useAuth().authContext;

    useEffect(() => {
        if (isLoading) {
            getQuestionById(route.params.questionId)
                .then(res => {
                    setQuestion(res.data.data);
                    getCommentsOfQuestion(route.params.questionId)
                        .then(resComments => {
                            setComments(
                                resComments.data?.status
                                    ? resComments.data.data
                                    : []
                            );
                            setIsLoading(false);
                        })
                        .catch(() => setIsLoading(false));
                })
                .catch(() => setIsLoading(false));
        }
    }, [isLoading, route.params.questionId]);

    function addComment(newComment) {
        setComments([...comments, newComment]);
    }

    function removeComment(commentId) {
        setComments(comments.filter(comment => comment.id !== commentId));
    }

    function onRefresh() {
        setIsLoading(true);
    }

    const isDarkMode = useColorScheme() === 'dark';

    const viewStyle = {
        flex: 1
    };

    const commentsViewStyle = {
        backgroundColor: isDarkMode ? Colors.black._100 : Colors.white._0,
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
                                authorName={question.User.display_name}
                                authorId={question.User.user_id}
                                creationDate={question.creation_date}
                            />
                        )}
                        contentContainerStyle={commentsContainerStyle}
                        data={comments}
                        renderItem={item => (
                            <CommentItem
                                item={item}
                                removeComment={removeComment}
                            />
                        )}
                    />
                    {isAuth() && (
                        <NewComment
                            questionId={route.params.questionId}
                            addComment={addComment}
                        />
                    )}
                </>
            )}
        </View>
    );
};

export default QuestionScreen;

import React from 'react';
import LiText from '../../component/LiText/LiText';
import { Alert, useColorScheme, View } from 'react-native';
import Spacings from '../../styles/spacings';
import Colors from '../../styles/colors';
import PostHeader from '../../component/Post/PostHeader/PostHeader';
import { useAuth } from '../../context/auth-context';
import DeletePost from '../../component/Post/DeletePost/DeletePost';
import { deleteComment as deleteCommentAPI } from '../../api/comments-api';

const CommentLayout = ({
    commentId,
    content,
    authorName,
    authorId,
    date,
    removeComment
}) => {
    const isDarkMode = useColorScheme() === 'dark';

    const { userId, isAuth } = useAuth().authContext;

    function isAuthor() {
        return isAuth() && authorId === userId;
    }

    const commentStyle = {
        marginTop: Spacings._4,
        marginBottom: Spacings._16,
        width: '100%'
    };

    const commentContentStyle = {
        marginBottom: Spacings._0,
        color: isDarkMode ? Colors.gray._0 : Colors.black._50
    };

    function deleteComment() {
        deleteCommentAPI(commentId).then(res => {
            if (res.data?.status) {
                removeComment(commentId);
            }
        });
    }

    function onDeleteCommentClicked() {
        // delete comment
        Alert.alert(
            'Supprimer le commentaire',
            'Êtes-vous certains de vouloir supprimer le commentaire ? Cette suppression sera définitive.',
            [
                {
                    text: 'Annuler',
                    style: 'cancel'
                },
                {
                    text: 'Supprimer',
                    onPress: () => deleteComment()
                }
            ]
        );
    }

    return (
        <View style={commentStyle}>
            <PostHeader author={authorName} date={date} />
            <LiText style={commentContentStyle}>{content}</LiText>
            {isAuthor() && <DeletePost deletePost={onDeleteCommentClicked} />}
        </View>
    );
};

export default CommentLayout;

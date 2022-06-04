import React from 'react';
import LiTitle from '../../component/LiTitle/LiTitle';
import Fonts from '../../styles/fonts';
import PostHeader from '../../component/Post/PostHeader/PostHeader';
import LiText from '../../component/LiText/LiText';
import { Alert, useColorScheme } from 'react-native';
import LiSeparator from '../../component/LiSeparator/LiSeparator';
import Spacings from '../../styles/spacings';
import Colors from '../../styles/colors';
import { useAuth } from '../../context/auth-context';
import { deleteQuestion as deleteQuestionAPI } from '../../api/questions-api';
import { useNavigation } from '@react-navigation/native';
import DeletePost from '../../component/Post/DeletePost/DeletePost';
import ActionPost from '../../component/Post/ActionPost/ActionPost';
import FollowUp from '../../component/Post/FollowUp/FollowUp';
import Reaction from '../../component/Post/Reaction/Reaction';

const QuestionLayout = ({
    questionId,
    title,
    authorName,
    authorId,
    content,
    creationDate
}) => {
    const { userId, isAuth } = useAuth().authContext;

    const navigation = useNavigation();

    function isAuthor() {
        return isAuth() && authorId === userId;
    }

    const isDarkMode = useColorScheme() === 'dark';

    const contentTextStyle = {
        marginBottom: Spacings._0,
        color: isDarkMode ? Colors.gray._0 : Colors.black._50
    };

    const separatorStyle = {
        marginTop: isAuthor() ? Spacings._12 : Spacings._24,
        marginBottom: Spacings._24
    };

    const titleCommentsPartStyle = {
        paddingBottom: Spacings._4
    };

    function deleteQuestion() {
        deleteQuestionAPI(questionId).then(res => {
            if (res.data?.status) {
                navigation.navigate('Index');
            }
        });
    }

    function onDeleteQuestionClicked() {
        Alert.alert(
            'Supprimer la question',
            'Êtes-vous certains de vouloir supprimer la question ? Cette suppression sera définitive.',
            [
                {
                    text: 'Annuler',
                    style: 'cancel'
                },
                {
                    text: 'Supprimer',
                    onPress: () => deleteQuestion()
                }
            ]
        );
    }

    /**
     * TODO:
     * - Bouton réaction (avec nb)
     * - Bouton Follow (avec isFollowing)
     */

    return (
        <>
            <LiTitle fontSize={Fonts.size.xl_2}>{title}</LiTitle>
            <PostHeader author={authorName} date={creationDate} />
            <LiText style={contentTextStyle}>{content}</LiText>
            {isAuthor() && (
                <ActionPost>
                    <Reaction
                        style={{
                            marginRight: Spacings._8,
                            paddingLeft: Spacings._0
                        }}
                        nbReactions={4}
                    />
                    <FollowUp isFollowing={false} />
                    <DeletePost deletePost={onDeleteQuestionClicked} />
                </ActionPost>
            )}
            <LiSeparator style={separatorStyle} />
            <LiTitle fontSize={Fonts.size.xl} style={titleCommentsPartStyle}>
                Commentaires
            </LiTitle>
        </>
    );
};

export default QuestionLayout;

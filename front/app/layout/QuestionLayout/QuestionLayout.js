import React, { useCallback, useEffect, useState } from 'react';
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
import FollowUp, { FollowType } from '../../component/Post/FollowUp/FollowUp';
import Reaction from '../../component/Post/Reaction/Reaction';
import {
    createFollowQuestion,
    deleteFollowQuestion,
    getFollowOfQuestion
} from '../../api/follow-question-api';
import {
    createFollowUser,
    deleteFollowUser,
    getFollowUser
} from '../../api/follow-user-api';

const QuestionLayout = ({
    questionId,
    title,
    authorName,
    authorId,
    content,
    creationDate
}) => {
    const [isFollowingQuestion, setIsFollowingQuestion] = useState(false);
    const [isFollowingUser, setIsFollowingUser] = useState(false);

    const { userId, isAuth } = useAuth().authContext;

    const navigation = useNavigation();

    const isAuthor = useCallback(() => {
        return isAuth() && authorId === userId;
    }, [isAuth, authorId, userId]);

    useEffect(() => {
        if (!isAuth() || isAuthor()) {
            return;
        }

        getFollowOfQuestion(questionId)
            .then(res => {
                if (res.data.status) {
                    setIsFollowingQuestion(res.data.data != null);
                } else {
                    setIsFollowingQuestion(false);
                }
            })
            .catch(() => setIsFollowingQuestion(false));
    }, [questionId, isAuth, isAuthor]);

    useEffect(() => {
        if (!isAuth() || isAuthor()) {
            return;
        }

        getFollowUser(authorId)
            .then(res => {
                if (res.data.status) {
                    setIsFollowingUser(res.data.data != null);
                } else {
                    setIsFollowingUser(false);
                }
            })
            .catch(() => setIsFollowingUser(false));
    }, [authorId, isAuth, isAuthor]);

    const isDarkMode = useColorScheme() === 'dark';

    const contentTextStyle = {
        marginBottom: Spacings._0,
        color: isDarkMode ? Colors.gray._0 : Colors.black._50
    };

    const separatorStyle = {
        marginTop: Spacings._12,
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

    function onFollowQuestionClicked() {
        if (isFollowingQuestion) {
            deleteFollowQuestion(questionId).then(res => {
                if (res.data.status) {
                    setIsFollowingQuestion(false);
                }
            });
        } else {
            createFollowQuestion(questionId).then(res => {
                if (res.data.status) {
                    setIsFollowingQuestion(true);
                }
            });
        }
    }

    function onFollowUserClicked() {
        if (isFollowingUser) {
            deleteFollowUser(authorId).then(res => {
                if (res.data.status) {
                    setIsFollowingUser(false);
                }
            });
        } else {
            createFollowUser(authorId).then(res => {
                if (res.data.status) {
                    setIsFollowingUser(true);
                }
            });
        }
    }

    /**
     * TODO:
     * - Bouton réaction (avec nb)
     */

    return (
        <>
            <LiTitle fontSize={Fonts.size.xl_2}>{title}</LiTitle>
            <PostHeader author={authorName} date={creationDate}>
                {!isAuthor() && (
                    <FollowUp
                        isFollowing={isFollowingUser}
                        style={{ paddingLeft: 0 }}
                        type={FollowType.user}
                        followClicked={onFollowUserClicked}
                    />
                )}
            </PostHeader>
            <LiText style={contentTextStyle}>{content}</LiText>
            <ActionPost>
                <Reaction
                    style={{
                        marginRight: Spacings._8,
                        paddingLeft: Spacings._0
                    }}
                    nbReactions={4}
                />
                {!isAuthor() && (
                    <FollowUp
                        isFollowing={isFollowingQuestion}
                        followClicked={onFollowQuestionClicked}
                        type={FollowType.question}
                    />
                )}
                {isAuthor() && (
                    <DeletePost deletePost={onDeleteQuestionClicked} />
                )}
            </ActionPost>
            <LiSeparator style={separatorStyle} />
            <LiTitle fontSize={Fonts.size.xl} style={titleCommentsPartStyle}>
                Commentaires
            </LiTitle>
        </>
    );
};

export default QuestionLayout;

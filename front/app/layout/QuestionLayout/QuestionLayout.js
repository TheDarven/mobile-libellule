import React from 'react';
import LiTitle from '../../component/LiTitle/LiTitle';
import Fonts from '../../styles/fonts';
import PostHeader from '../../component/Post/PostHeader/PostHeader';
import LiText from '../../component/LiText/LiText';
import { Alert, useColorScheme, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LiSeparator from '../../component/LiSeparator/LiSeparator';
import Spacings from '../../styles/spacings';
import Colors from '../../styles/colors';
import { useAuth } from '../../context/auth-context';
import { nonEmptyOrNull } from '../../util/string-helper';
import { deleteQuestion as deleteQuestionAPI } from '../../api/questions-api';
import { useNavigation } from '@react-navigation/native';

const QuestionLayout = ({
    questionId,
    title,
    author,
    content,
    creationDate
}) => {
    const { displayName } = useAuth().authContext;

    const navigation = useNavigation();

    function isAuthor() {
        return nonEmptyOrNull(author) && displayName === author;
    }

    const isDarkMode = useColorScheme() === 'dark';

    const contentTextStyle = {
        marginBottom: Spacings._0,
        color: isDarkMode ? Colors.gray._0 : Colors.black._50
    };

    const actionsViewStyle = {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center'
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

    return (
        <>
            <LiTitle fontSize={Fonts.size.xl_2}>{title}</LiTitle>
            <PostHeader author={author} date={creationDate} />
            <LiText style={contentTextStyle}>{content}</LiText>
            {isAuthor() && (
                <View style={actionsViewStyle}>
                    <View
                        onTouchEnd={onDeleteQuestionClicked}
                        style={{
                            paddingHorizontal: Spacings._20,
                            paddingVertical: Spacings._8
                        }}>
                        <FontAwesome name={'trash-o'} size={Fonts.size.lg} />
                    </View>
                </View>
            )}
            <LiSeparator style={separatorStyle} />
            <LiTitle fontSize={Fonts.size.xl} style={titleCommentsPartStyle}>
                Commentaires
            </LiTitle>
        </>
    );
};

export default QuestionLayout;

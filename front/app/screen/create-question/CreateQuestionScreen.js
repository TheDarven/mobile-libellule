import React, { useEffect, useState } from 'react';
import LiMainScrollView from '../../component/LiMainScrollView/LiMainScrollView';
import Spacings from '../../styles/spacings';
import LiTitle from '../../component/LiTitle/LiTitle';
import { View } from 'react-native';
import LiTextInput from '../../component/LiTextInput/LiTextInput';
import Fonts from '../../styles/fonts';
import LiPressable from '../../component/LiPressable/LiPressable';
import { nonEmptyOrNull } from '../../util/string-helper';
import { createQuestion } from '../../api/questions-api';
import { useNavigation } from '@react-navigation/native';

const CreateQuestionScreen = () => {
    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);
    const [isPosting, setIsPosting] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {
        setIsFormValid(nonEmptyOrNull(title) && nonEmptyOrNull(content));
    }, [title, content]);

    function onPostClicked() {
        setIsPosting(true);
        createQuestion(title, content)
            .then(res => {
                setIsPosting(false);
                if (res.data?.status) {
                    navigation.replace('Question', {
                        questionId: res.data.data.questionId
                    });
                } else {
                    setIsPosting(false);
                }
            })
            .catch(() => setIsPosting(false));
    }

    return (
        <LiMainScrollView>
            <LiTitle>Créer une question</LiTitle>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <LiTitle
                    fontSize={Fonts.size.lg}
                    style={{ alignSelf: 'flex-start' }}>
                    Titre
                </LiTitle>
                <LiTextInput
                    placeholder="Titre"
                    value={title}
                    onChangeText={setTitle}
                    style={{
                        marginBottom: Spacings._20
                    }}
                />

                <LiTitle
                    fontSize={Fonts.size.lg}
                    style={{ alignSelf: 'flex-start' }}>
                    Contenu
                </LiTitle>
                <LiTextInput
                    placeholder={'Contenu de la question'}
                    value={content}
                    onChangeText={setContent}
                    multiline={true}
                    numberOfLines={10}
                    style={{
                        textAlignVertical: 'top',
                        marginBottom: Spacings._24
                    }}
                />

                <View style={{ alignItems: 'flex-end', width: '100%' }}>
                    <LiPressable
                        onPressIn={onPostClicked}
                        title="Créer la question"
                        disable={!isFormValid || isPosting}
                    />
                </View>
            </View>
        </LiMainScrollView>
    );
};

export default CreateQuestionScreen;

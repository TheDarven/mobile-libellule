import React from 'react';
import IndexQuestionsLayout from '../../layout/IndexQuestionsLayout/IndexQuestionsLayout';
import { View } from 'react-native';
import { useAuth } from '../../context/auth-context';
import NewQuestionButton from '../../layout/IndexQuestionsLayout/NewQuestionButton/NewQuestionButton';

const IndexScreen = () => {
    const { isAuth } = useAuth().authContext;

    return (
        <View style={{ flex: 1 }}>
            <IndexQuestionsLayout />
            {isAuth() && <NewQuestionButton />}
        </View>
    );
};

export default IndexScreen;

import React, { useEffect, useState } from 'react';
import QuestionLayout from '../QuestionLayout/QuestionLayout';
import { RefreshControl, View } from 'react-native';
import Spacings from '../../styles/spacings';
import LiTitle from '../../component/LiTitle/LiTitle';
import { getAllQuestions } from '../../api/questions-api';
import LiText from '../../component/LiText/LiText';
import LiMainScrollView from '../../component/LiMainScrollView/LiMainScrollView';

const IndexQuestionsLayout = () => {
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isLoading) {
            getAllQuestions()
                .then(res => {
                    setQuestions(res.data.data);
                    setIsLoading(false);
                })
                .catch(() => setIsLoading(false));
        }
    }, [isLoading]);

    function onRefresh() {
        setIsLoading(true);
    }

    return (
        <LiMainScrollView
            refreshControl={
                <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
            }
            contentInsetAdjustmentBehavior="automatic"
            contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ flex: 1, marginBottom: Spacings._80 }}>
                <LiTitle style={{ paddingHorizontal: Spacings._4 }}>
                    Dernières questions
                </LiTitle>
                {isLoading || questions.length === 0 ? (
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <LiText>
                            {isLoading
                                ? 'Chargement des questions…'
                                : "Aucune question n'est présente"}
                        </LiText>
                    </View>
                ) : (
                    <>
                        {questions.map(question => (
                            <QuestionLayout
                                key={question.question_id}
                                author={question.User.display_name}
                                content={question.content}
                                title={question.title}
                                nbComments={question.comm_amount}
                                questionId={question.id}
                                date={question.creation_date}
                            />
                        ))}
                    </>
                )}
            </View>
        </LiMainScrollView>
    );
};

export default IndexQuestionsLayout;

import React, { useEffect, useState } from 'react';
import { RefreshControl } from 'react-native';
import Spacings from '../../styles/spacings';
import LiTitle from '../../component/LiTitle/LiTitle';
import { getAllQuestions } from '../../api/questions-api';
import LiMainFlatList from '../../component/LiMainFlatList/LiMainFlatList';
import IndexQuestionsEmptyOrLoad from './IndexQuestionsEmptyOrLoad/IndexQuestionsEmptyOrLoad';
import QuestionItem from './QuestionItem/QuestionItem';
import { MainContent } from '../../component/LiMainView/LiMainView';
import { useIsFocused } from '@react-navigation/native';

const IndexQuestionsLayout = () => {
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const isFocus = useIsFocused();

    useEffect(() => {
        if (isFocus) {
            setIsLoading(true);
        }
    }, [isFocus]);

    useEffect(() => {
        if (isLoading) {
            getAllQuestions()
                .then(res => {
                    setQuestions(res.data.data ?? []);
                    setIsLoading(false);
                })
                .catch(() => setIsLoading(false));
        }
    }, [isLoading]);

    function onRefresh() {
        setIsLoading(true);
    }

    return (
        <LiMainFlatList
            ListHeaderComponent={() => (
                <LiTitle style={{ paddingHorizontal: Spacings._8 }}>
                    Dernières questions
                </LiTitle>
            )}
            refreshControl={
                <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
            }
            ListEmptyComponent={() => (
                <IndexQuestionsEmptyOrLoad isLoading={isLoading} />
            )}
            data={questions}
            renderItem={item => <QuestionItem item={item} />}
            contentInsetAdjustmentBehavior="automatic"
            contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: Spacings._80
            }}
            type={MainContent.card}
        />
    );
};

export default IndexQuestionsLayout;

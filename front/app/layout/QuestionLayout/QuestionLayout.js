import React from 'react';
import Spacings from '../../styles/spacings';
import LiCard from '../../component/LiCard/LiCard';
import { useNavigation } from '@react-navigation/native';
import QuestionHeaderLayout from './QuestionHeaderLayout/QuestionHeaderLayout';
import QuestionContentLayout from './QuestionContentLayout/QuestionContentLayout';
import QuestionFooterLayout from './QuestionFooterLayout/QuestionFooterLayout';

const QuestionLayout = ({
    questionId,
    title,
    author,
    content,
    nbComments,
    date
}) => {
    const navigation = useNavigation();

    const cardStyle = {
        marginBottom: Spacings._16
    };

    return (
        <LiCard
            style={cardStyle}
            onTouchEnd={() => {
                navigation.navigate('Question', {
                    questionId
                });
            }}>
            <QuestionHeaderLayout author={author} date={date} />
            <QuestionContentLayout title={title} content={content} />
            <QuestionFooterLayout nbComments={nbComments} />
        </LiCard>
    );
};

export default QuestionLayout;

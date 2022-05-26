import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Spacings from '../../../styles/spacings';
import LiCard from '../../LiCard/LiCard';
import PostHeader from '../PostHeader/PostHeader';
import QuestionContent from './QuestionContent/QuestionContent';
import QuestionFooter from './QuestionFooter/QuestionFooter';

const Question = ({ questionId, title, author, content, nbComments, date }) => {
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
            <PostHeader author={author} date={date} />
            <QuestionContent title={title} content={content} />
            <QuestionFooter nbComments={nbComments} />
        </LiCard>
    );
};

export default Question;

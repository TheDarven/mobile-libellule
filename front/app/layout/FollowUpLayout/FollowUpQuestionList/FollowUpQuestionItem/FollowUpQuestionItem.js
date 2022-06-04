import React from 'react';
import FollowUpQuestion from '../../FollowUpQuestion/FollowUpQuestion';

const FollowUpQuestionItem = ({ item }) => {
    const { index } = item;
    const question = item.item;

    return (
        <FollowUpQuestion
            index={index}
            title={question.title}
            author={question.author}
            date={question.date}
            nbComments={question.nbComments}
        />
    );
};

export default FollowUpQuestionItem;

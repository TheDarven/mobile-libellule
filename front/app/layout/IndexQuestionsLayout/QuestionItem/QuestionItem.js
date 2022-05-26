import React from 'react';
import QuestionLayout from '../../QuestionLayout/QuestionLayout';

const QuestionItem = ({ item }) => {
    const { index } = item;
    const question = item.item;

    return (
        <QuestionLayout
            key={index}
            author={question.User.display_name}
            content={question.content}
            title={question.title}
            nbComments={question.comm_amount}
            questionId={question.id}
            date={question.creation_date}
        />
    );
};

export default QuestionItem;

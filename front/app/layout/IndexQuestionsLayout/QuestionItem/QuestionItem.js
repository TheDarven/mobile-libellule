import React from 'react';
import Question from '../../../component/Post/Question/Question';

const QuestionItem = ({ item }) => {
    const { index } = item;
    const question = item.item;

    return (
        <Question
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

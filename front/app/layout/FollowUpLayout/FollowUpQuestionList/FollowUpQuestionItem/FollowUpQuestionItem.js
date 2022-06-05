import React from 'react';
import FollowUpQuestion from '../../FollowUpQuestion/FollowUpQuestion';

const FollowUpQuestionItem = ({ item, unfollowQuestion }) => {
    const { index } = item;
    const question = item.item;

    return (
        <FollowUpQuestion
            index={index}
            questionId={question.questionId}
            title={question.title}
            author={question.author}
            date={question.date}
            nbComments={question.nbComments}
            unfollowQuestion={unfollowQuestion}
        />
    );
};

export default FollowUpQuestionItem;

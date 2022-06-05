import React from 'react';
import FollowUpQuestion from '../../FollowUpQuestion/FollowUpQuestion';

const FollowUpQuestionItem = ({ item, unfollowQuestion }) => {
    const { index } = item;
    const question = item.item;

    return (
        <FollowUpQuestion
            index={index}
            questionId={question.Question.questionId}
            title={question.Question.title}
            author={question.Question.User.display_name}
            date={question.Question.creation_date}
            nbComments={question.Question.nbComment}
            unfollowQuestion={unfollowQuestion}
        />
    );
};

export default FollowUpQuestionItem;

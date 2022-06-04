import React from 'react';
import QuestionTitle from '../../../component/Post/Question/QuestionContent/QuestionTitle/QuestionTitle';
import QuestionFooter from '../../../component/Post/Question/QuestionFooter/QuestionFooter';
import LiCard from '../../../component/LiCard/LiCard';
import PostDate from '../../../component/Post/PostHeader/PostDate/PostDate';
import PostAuthor from '../../../component/Post/PostHeader/PostAuthor/PostAuthor';
import Spacings from '../../../styles/spacings';

const FollowUpQuestion = ({ title, author, date, nbComments }) => {
    const cardStyle = {
        width: 256
    };

    const postDateStyle = {
        marginBottom: Spacings._12
    };

    return (
        <LiCard style={cardStyle}>
            <QuestionTitle title={title} />
            <PostAuthor author={author} style={postDateStyle} />
            <QuestionFooter nbComments={nbComments} />
            <PostDate date={date} style={{ alignSelf: 'flex-end' }} />
        </LiCard>
    );
};

export default FollowUpQuestion;

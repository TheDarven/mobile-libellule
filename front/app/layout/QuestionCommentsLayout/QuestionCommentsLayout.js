import React from 'react';
import { View } from 'react-native';
import Spacings from '../../styles/spacings';
import CommentLayout from '../CommentLayout/CommentLayout';

const QuestionCommentsLayout = ({ comments }) => {
    const questionCommentsStyle = {
        alignItems: 'center',
        marginTop: Spacings._4
    };

    return (
        <View style={questionCommentsStyle}>
            {comments.map(comment => {
                return (
                    <CommentLayout
                        key={comment.commentId}
                        content={comment.content}
                        author={comment.author}
                        date={comment.date}
                    />
                );
            })}
        </View>
    );
};

export default QuestionCommentsLayout;

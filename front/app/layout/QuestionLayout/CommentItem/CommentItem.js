import React from 'react';
import CommentLayout from '../../CommentLayout/CommentLayout';

const CommentItem = ({ item }) => {
    const { index } = item;
    const comment = item.item;
    return (
        <CommentLayout
            key={index}
            content={comment.content}
            author={comment.author}
            date={comment.date}
        />
    );
};

export default CommentItem;

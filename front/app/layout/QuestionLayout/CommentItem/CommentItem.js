import React from 'react';
import CommentLayout from '../../CommentLayout/CommentLayout';

const CommentItem = ({ item }) => {
    const { index } = item;
    const comment = item.item;
    return (
        <CommentLayout
            key={index}
            content={comment.content}
            author={comment.User.display_name}
            date={comment.creation_date}
        />
    );
};

export default CommentItem;

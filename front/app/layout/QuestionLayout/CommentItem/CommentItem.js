import React from 'react';
import CommentLayout from '../../CommentLayout/CommentLayout';

const CommentItem = ({ item, removeComment }) => {
    const { index } = item;
    const comment = item.item;
    return (
        <CommentLayout
            key={index}
            commentId={comment.id}
            content={comment.content}
            authorName={comment.User.display_name}
            authorId={comment.User.user_id}
            date={comment.creation_date}
            removeComment={removeComment}
        />
    );
};

export default CommentItem;

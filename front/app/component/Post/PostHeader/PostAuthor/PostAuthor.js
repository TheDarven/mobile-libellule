import React from 'react';
import LiText from '../../../LiText/LiText';

const PostAuthor = ({ author, style }) => {
    const authorStyle = {
        fontFamily: 'Roboto-Medium',
        ...style
    };

    return (
        <LiText style={authorStyle}>{author}</LiText>
    );
};

export default PostAuthor;

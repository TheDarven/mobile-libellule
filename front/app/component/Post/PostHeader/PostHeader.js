import React from 'react';
import { View } from 'react-native';
import { cardHeaderStyle } from './PostHeaderStyle';
import PostAuthor from './PostAuthor/PostAuthor';
import PostDate from './PostDate/PostDate';

const PostHeader = ({ author, date }) => {
    return (
        <View style={cardHeaderStyle}>
            <PostAuthor author={author} style={{ flex: 1 }} />
            <PostDate date={date} />
        </View>
    );
};

export default PostHeader;

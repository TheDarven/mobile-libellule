import React from 'react';
import { View } from 'react-native';
import { cardHeaderStyle } from './PostHeaderStyle';
import PostAuthor from './PostAuthor/PostAuthor';
import PostDate from './PostDate/PostDate';
import Spacings from '../../../styles/spacings';

const PostHeader = ({ author, date, children }) => {
    return (
        <>
            <View style={{ marginBottom: Spacings._8 }}>
                <View style={cardHeaderStyle}>
                    <PostAuthor author={author} style={{ flex: 1 }} />
                    <PostDate date={date} />
                </View>
                {children}
            </View>
        </>
    );
};

export default PostHeader;

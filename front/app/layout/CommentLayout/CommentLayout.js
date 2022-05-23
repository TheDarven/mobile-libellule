import React from 'react';
import LiText from '../../component/LiText/LiText';
import { useColorScheme, View } from 'react-native';
import Spacings from '../../styles/spacings';
import Colors from '../../styles/colors';
import QuestionHeaderLayout from '../QuestionLayout/QuestionHeaderLayout/QuestionHeaderLayout';

const CommentLayout = ({ content, author, date }) => {
    const isDarkMode = useColorScheme() === 'dark';

    const commentStyle = {
        marginTop: Spacings._4,
        marginBottom: Spacings._16,
        width: '100%'
    };

    const commentContentStyle = {
        marginBottom: Spacings._24,
        color: isDarkMode ? Colors.gray._0 : Colors.black._50
    };
    return (
        <View style={commentStyle}>
            <QuestionHeaderLayout author={author} date={date} />
            <LiText style={commentContentStyle}>{content}</LiText>
        </View>
    );
};

export default CommentLayout;

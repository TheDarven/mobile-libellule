import React from 'react';
import { useColorScheme } from 'react-native';
import LiText from '../../../LiText/LiText';
import Colors from '../../../../styles/colors';
import Spacings from '../../../../styles/spacings';
import QuestionTitle from './QuestionTitle/QuestionTitle';

const QuestionContent = ({ title, content }) => {
    const isDarkMode = useColorScheme() === 'dark';

    const cardContentStyle = {
        marginBottom: Spacings._16,
        color: isDarkMode ? Colors.gray._0 : Colors.black._50
    };

    return (
        <>
            <QuestionTitle title={title} />
            <LiText style={cardContentStyle}>{content}</LiText>
        </>
    );
};

export default QuestionContent;

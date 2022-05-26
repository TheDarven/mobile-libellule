import React from 'react';
import { useColorScheme } from 'react-native';
import LiText from '../../../LiText/LiText';
import Fonts from '../../../../styles/fonts';
import Colors from '../../../../styles/colors';
import Spacings from '../../../../styles/spacings';

const QuestionContent = ({ title, content }) => {
    const isDarkMode = useColorScheme() === 'dark';

    const cardTitleStyle = {
        fontWeight: '700',
        marginBottom: Spacings._8
    };

    const cardContentStyle = {
        marginBottom: Spacings._16,
        color: isDarkMode ? Colors.gray._0 : Colors.black._50
    };

    return (
        <>
            <LiText style={cardTitleStyle} fontSize={Fonts.size.lg}>
                {title}
            </LiText>
            <LiText style={cardContentStyle}>{content}</LiText>
        </>
    );
};

export default QuestionContent;

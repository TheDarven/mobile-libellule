import React from 'react';
import Fonts from '../../../../../styles/fonts';
import LiText from '../../../../LiText/LiText';
import Spacings from '../../../../../styles/spacings';

const QuestionTitle = ({ title }) => {
    const cardTitleStyle = {
        fontWeight: '700',
        marginBottom: Spacings._8
    };

    return (
        <LiText style={cardTitleStyle} fontSize={Fonts.size.lg}>
            {title}
        </LiText>
    );
};

export default QuestionTitle;

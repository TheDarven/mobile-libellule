import React from 'react';
import LiText from '../LiText/LiText';
import Spacings from '../../styles/spacings';
import Fonts from '../../styles/fonts';

const LiTitle = props => {
    const style = {
        marginBottom: Spacings._16,
        fontWeight: '700',
        ...props.style
    };

    return (
        <LiText fontSize={Fonts.size.xl} {...props} style={style}>
            {props.children}
        </LiText>
    );
};

export default LiTitle;

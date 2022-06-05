import React from 'react';
import { View } from 'react-native';
import Spacings from '../../../styles/spacings';

const ActionPost = ({ children, style }) => {
    const viewStyle = {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Spacings._8,
        ...style
    };

    return <View style={viewStyle}>{children}</View>;
};

export default ActionPost;

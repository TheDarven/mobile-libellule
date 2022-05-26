import React from 'react';
import LiPressable, {
    LiPressableSize,
    LiPressableType
} from '../../../component/LiPressable/LiPressable';
import Feather from 'react-native-vector-icons/Feather';
import { View } from 'react-native';

import { viewStyle, buttonStyle, iconStyle } from './NewQuestionButtonStyle';

const NewQuestionButton = () => {
    return (
        <View style={viewStyle}>
            <LiPressable
                size={LiPressableSize.large}
                elevation={4}
                title={'Nouveau post'}
                type={LiPressableType.secondary}
                style={buttonStyle}
                icon={<Feather name={'edit'} size={16} style={iconStyle} />}
            />
        </View>
    );
};

export default NewQuestionButton;

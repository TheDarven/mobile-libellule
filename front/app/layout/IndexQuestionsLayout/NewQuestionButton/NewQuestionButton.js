import React from 'react';
import LiPressable, {
    LiPressableSize,
    LiPressableType
} from '../../../component/LiPressable/LiPressable';
import Feather from 'react-native-vector-icons/Feather';
import { View } from 'react-native';

import { viewStyle, buttonStyle, iconStyle } from './NewQuestionButtonStyle';
import { useNavigation } from '@react-navigation/native';

const NewQuestionButton = () => {
    const navigation = useNavigation();

    return (
        <View style={viewStyle}>
            <LiPressable
                size={LiPressableSize.large}
                elevation={4}
                title={'Nouvelle question'}
                type={LiPressableType.secondary}
                style={buttonStyle}
                onTouchEnd={() => navigation.navigate('CreateQuestion')}
                icon={<Feather name={'edit'} size={16} style={iconStyle} />}
            />
        </View>
    );
};

export default NewQuestionButton;

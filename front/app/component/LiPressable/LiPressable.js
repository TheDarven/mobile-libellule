import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import Borders from '../../styles/borders';
import Spacings from '../../styles/spacings';
import Colors from '../../styles/colors';
import LiText from '../LiText/LiText';

const LiPressable = props => {
    const [isPressed, setIsPressed] = useState(false);

    function onPressIn(event) {
        if (props.onPressIn) {
            props.onPressIn(event);
        }
        setIsPressed(true);
    }

    function onPressOut(event) {
        if (props.onPressOut) {
            props.onPressOut(event);
        }
        setIsPressed(false);
    }

    const viewStyle = {
        backgroundColor: props.disable ? Colors.black._20 : Colors.warning._50,
        borderRadius: Borders.radius._16,
        opacity: isPressed && !props.disable ? 0.8 : 1,
        paddingHorizontal: Spacings._16,
        paddingVertical: Spacings._12,
        shadowColor: Colors.black._80
    };

    const liTextStyle = {
        color: Colors.white._0
    };

    return (
        <Pressable {...props} onPressIn={onPressIn} onPressOut={onPressOut}>
            <View elevation={2} style={viewStyle}>
                {props.children ? (
                    props.children
                ) : (
                    <LiText style={liTextStyle}>
                        {props.title ?? '{ACTION_NAME}'}
                    </LiText>
                )}
            </View>
        </Pressable>
    );
};

export default LiPressable;

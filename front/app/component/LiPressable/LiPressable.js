import React, { useState } from 'react';
import { Pressable, useColorScheme, View } from 'react-native';
import Borders from '../../styles/borders';
import Spacings from '../../styles/spacings';
import Colors from '../../styles/colors';
import LiText from '../LiText/LiText';
import Fonts from '../../styles/fonts';
import Feather from 'react-native-vector-icons/Feather';

export const LiPressableSize = {
    small: {
        view: {
            paddingHorizontal: Spacings._12,
            paddingVertical: Spacings._8
        },
        fontSize: Fonts.size.md
    },
    medium: {
        view: {
            paddingHorizontal: Spacings._16,
            paddingVertical: Spacings._12
        },
        fontSize: Fonts.size.md
    },
    large: {
        view: {
            paddingHorizontal: Spacings._16,
            paddingVertical: Spacings._12
        },
        fontSize: Fonts.size.lg
    }
};

export const LiPressableType = {
    primary: {
        backgroundColor: {
            dark: Colors.warning._50,
            light: Colors.warning._50
        },
        color: {
            dark: Colors.white._0,
            light: Colors.white._0
        }
    },
    secondary: {
        backgroundColor: {
            dark: Colors.success._50,
            light: Colors.success._50
        },
        color: {
            dark: Colors.white._0,
            light: Colors.white._0
        }
    }
};

const LiPressable = props => {
    const [isPressed, setIsPressed] = useState(false);

    function onPressIn(event) {
        if (props.disable) {
            return;
        }

        if (props.onPressIn) {
            props.onPressIn(event);
        }
        setIsPressed(true);
    }

    function onPressOut(event) {
        if (props.disable) {
            return;
        }

        if (props.onPressOut) {
            props.onPressOut(event);
        }
        setIsPressed(false);
    }

    const isDarkMode = useColorScheme() === 'dark';

    const fontSize = props.size?.fontSize ?? LiPressableSize.medium.fontSize;
    const liPressableSize = props.size?.view ?? LiPressableSize.medium.view;
    const type = props.type ?? LiPressableType.primary;

    const backgroundColor = () => {
        if (props.disable) {
            return isDarkMode ? Colors.black._50 : Colors.black._0;
        }
        return isDarkMode
            ? type.backgroundColor.dark
            : type.backgroundColor.light;
    };

    const viewStyle = {
        backgroundColor: backgroundColor(),
        borderRadius: Borders.radius._16,
        opacity: isPressed && !props.disable ? 0.8 : 1,
        shadowColor: Colors.black._80,
        ...liPressableSize
    };

    const liTextStyle = {
        color: isDarkMode ? type.color.dark : type.color.light
    };

    return (
        <Pressable {...props} onPressIn={onPressIn} onPressOut={onPressOut}>
            <View elevation={props.elevation ?? 2} style={viewStyle}>
                {props.children ? (
                    props.children
                ) : (
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                        {props.icon ? props.icon : <></>}
                        <LiText style={liTextStyle} fontSize={fontSize}>
                            {props.title ?? '{ACTION_NAME}'}
                        </LiText>
                    </View>
                )}
            </View>
        </Pressable>
    );
};

export default LiPressable;

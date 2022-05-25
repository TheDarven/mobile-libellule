import React from 'react';
import { useColorScheme, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fonts from '../../../styles/fonts';
import LiText from '../../../component/LiText/LiText';
import Spacings from '../../../styles/spacings';
import Colors from '../../../styles/colors';

const QuestionFooterLayout = ({ nbComments }) => {
    const isDarkMode = useColorScheme() === 'dark';

    const iconColor = isDarkMode ? Colors.gray._0 : Colors.black._20;

    const cardFooterStyle = {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    };

    const cardFooterCommentStyle = {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: Spacings._4
    };

    const cardFooterCommentTextStyle = {
        marginLeft: Spacings._8,
        color: iconColor
    };

    return (
        <View style={cardFooterStyle}>
            <View style={cardFooterCommentStyle}>
                <FontAwesome
                    name={'comment-o'}
                    size={Fonts.size.md}
                    color={iconColor}
                />
                <LiText style={cardFooterCommentTextStyle}>{nbComments}</LiText>
            </View>
        </View>
    );
};

export default QuestionFooterLayout;

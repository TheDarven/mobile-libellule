import React from 'react';
import LiText from '../../../component/LiText/LiText';
import { useColorScheme, View } from 'react-native';
import Fonts from '../../../styles/fonts';
import Spacings from '../../../styles/spacings';
import Colors from '../../../styles/colors';
import Borders from '../../../styles/borders';

const QuestionHeaderLayout = ({ author, date }) => {
    const isDarkMode = useColorScheme() === 'dark';

    const cardHeaderStyle = {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacings._8
    };

    const cardHeaderDateStyle = {
        backgroundColor: isDarkMode ? Colors.black._80 : Colors.white._50,
        paddingHorizontal: Spacings._8,
        paddingVertical: Spacings._4,
        borderRadius: Borders.radius._8
    };

    const cardHeaderDateTextStyle = {
        color: isDarkMode ? Colors.white._100 : Colors.black._50
    };

    return (
        <View style={cardHeaderStyle}>
            <LiText style={{ fontFamily: 'Roboto-Medium' }}>{author}</LiText>
            <View style={cardHeaderDateStyle}>
                <LiText
                    fontSize={Fonts.size.sm}
                    style={cardHeaderDateTextStyle}>
                    {date}
                </LiText>
            </View>
        </View>
    );
};

export default QuestionHeaderLayout;

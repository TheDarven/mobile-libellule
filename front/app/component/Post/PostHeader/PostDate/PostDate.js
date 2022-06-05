import React, { useEffect, useState } from 'react';
import LiText from '../../../LiText/LiText';
import Fonts from '../../../../styles/fonts';
import { useColorScheme, View } from 'react-native';
import { headerDateStyle, headerDateTextStyle } from './PostDateStyle';
import { formatDate } from '../../../../util/date-helper';

const PostDate = ({ date, style }) => {
    const [formattedDate, setFormattedDate] = useState(null);

    const isDarkMode = useColorScheme() === 'dark';

    useEffect(() => {
        setFormattedDate(formatDate(date));
    }, [date]);

    return (
        <View style={{ ...headerDateStyle(isDarkMode), ...style }}>
            <LiText
                fontSize={Fonts.size.sm}
                style={headerDateTextStyle(isDarkMode)}>
                {formattedDate}
            </LiText>
        </View>
    );
};

export default PostDate;

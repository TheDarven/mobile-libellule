import React, { useEffect, useState } from 'react';
import LiText from '../../../LiText/LiText';
import Fonts from '../../../../styles/fonts';
import { useColorScheme, View } from 'react-native';
import { headerDateStyle, headerDateTextStyle } from './PostDateStyle';

const PostDate = ({ date, style }) => {
    const [formattedDate, setFormattedDate] = useState(null);

    const isDarkMode = useColorScheme() === 'dark';

    useEffect(() => {
        const newDate = new Date(date);

        const months = [
            'Janvier',
            'Février',
            'Mars',
            'Avril',
            'Mai',
            'Juin',
            'Juillet',
            'Août',
            'Septembre',
            'Octobre',
            'Novembre',
            'Décembre'
        ];

        setFormattedDate(
            `${newDate.getDate()} ${
                months[newDate.getMonth()]
            } ${newDate.getFullYear()} à ${prefixNumber(
                newDate.getHours()
            )}h${prefixNumber(newDate.getUTCMinutes())}`
        );
    }, [date]);

    function prefixNumber(time) {
        return `${time < 10 ? '0' : ''}${time}`;
    }

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

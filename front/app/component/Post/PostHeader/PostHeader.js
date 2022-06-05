import React, { useEffect, useState } from 'react';
import LiText from '../../LiText/LiText';
import { useColorScheme, View } from 'react-native';
import Fonts from '../../../styles/fonts';
import {
    authorStyle,
    cardHeaderDateStyle,
    cardHeaderDateTextStyle,
    cardHeaderStyle
} from './PostHeaderStyle';

const PostHeader = ({ author, date }) => {
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
        <View style={cardHeaderStyle}>
            <LiText style={authorStyle}>{author}</LiText>
            <View style={cardHeaderDateStyle(isDarkMode)}>
                <LiText
                    fontSize={Fonts.size.sm}
                    style={cardHeaderDateTextStyle(isDarkMode)}>
                    {formattedDate}
                </LiText>
            </View>
        </View>
    );
};

export default PostHeader;

import React from 'react';
import { useColorScheme, View } from 'react-native';
import Colors from '../../styles/colors';
import Borders from '../../styles/borders';
import Spacings from '../../styles/spacings';

const LiCard = props => {
    const isDarkMode = useColorScheme() === 'dark';

    const cardStyle = {
        backgroundColor: isDarkMode ? Colors.black._100 : Colors.white._0,
        borderRadius: Borders.radius._12,
        paddingHorizontal: Spacings._20,
        paddingVertical: Spacings._16,
        marginBottom: Spacings._4,
        marginHorizontal: Spacings._4,
        ...props.style
    };

    return (
        <View {...props} elevation={1} style={cardStyle}>
            {props.children}
        </View>
    );
};

export default LiCard;

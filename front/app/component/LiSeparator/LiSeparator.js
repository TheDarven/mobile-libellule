import React from 'react';
import Colors from '../../styles/colors';
import { useColorScheme, View } from 'react-native';

const LiSeparator = ({ style }) => {
    const isDarkMode = useColorScheme() === 'dark';

    const separatorStyle = {
        borderBottomColor: isDarkMode ? Colors.black._80 : Colors.white._100,
        borderBottomWidth: 2,
        borderRadius: 8,
        ...style
    };

    return <View style={separatorStyle} />;
};

export default LiSeparator;

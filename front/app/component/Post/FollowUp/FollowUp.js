import React from 'react';
import Spacings from '../../../styles/spacings';
import { View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Fonts from '../../../styles/fonts';

const FollowUp = ({ isFollowing }) => {
    return (
        <View
            style={{
                paddingHorizontal: Spacings._12,
                paddingVertical: Spacings._8
            }}>
            <Feather
                name={isFollowing ? 'bell-off' : 'bell'}
                size={Fonts.size.lg}
            />
        </View>
    );
};

export default FollowUp;

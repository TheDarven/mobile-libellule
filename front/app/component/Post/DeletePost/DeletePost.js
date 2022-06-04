import React from 'react';
import { View } from 'react-native';
import Spacings from '../../../styles/spacings';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fonts from '../../../styles/fonts';

const DeletePost = ({ deletePost }) => {
    return (
        <View
            onTouchEnd={deletePost}
            style={{
                paddingHorizontal: Spacings._20,
                paddingVertical: Spacings._8,
                marginLeft: 'auto'
            }}>
            <FontAwesome name={'trash-o'} size={Fonts.size.lg} />
        </View>
    );
};

export default DeletePost;

import React from 'react';
import { View } from 'react-native';
import Spacings from '../../../styles/spacings';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fonts from '../../../styles/fonts';

const DeletePost = ({ deletePost }) => {
    const deleteViewStyle = {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center'
    };

    return (
        <View style={deleteViewStyle}>
            <View
                onTouchEnd={deletePost}
                style={{
                    paddingHorizontal: Spacings._20,
                    paddingVertical: Spacings._8
                }}>
                <FontAwesome name={'trash-o'} size={Fonts.size.lg} />
            </View>
        </View>
    );
};

export default DeletePost;

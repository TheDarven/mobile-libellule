import React from 'react';
import { useColorScheme, View } from 'react-native';
import Spacings from '../../../styles/spacings';
import Colors, { AppBackgroundColor } from '../../../styles/colors';
import Borders from '../../../styles/borders';
import LiTextInput from '../../../component/LiTextInput/LiTextInput';
import LiPressable from '../../../component/LiPressable/LiPressable';

const NewComment = () => {
    const isDarkMode = useColorScheme() === 'dark';

    const newCommentViewStyle = {
        paddingHorizontal: Spacings._12,
        paddingVertical: Spacings._12,
        backgroundColor: isDarkMode
            ? AppBackgroundColor.dark
            : Colors.white._50,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: Borders.radius._4,
        shadowColor: '#000'
    };

    const newCommentInputViewStyle = {
        flex: 1,
        marginRight: Spacings._12
    };

    const newCommentInputStyle = {
        textAlignVertical: 'top',
        paddingBottom: Spacings._4,
        paddingTop: Spacings._12
    };

    return (
        <View style={newCommentViewStyle}>
            <View style={newCommentInputViewStyle}>
                <LiTextInput
                    multiline={true}
                    numberOfLines={2}
                    style={newCommentInputStyle}
                    placeholder={'Votre commentaire ici..'}
                />
            </View>
            <LiPressable title={'Poster'} />
        </View>
    );
};

export default NewComment;

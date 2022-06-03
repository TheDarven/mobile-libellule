import React, { useEffect, useState } from 'react';
import { useColorScheme, View } from 'react-native';
import Spacings from '../../../styles/spacings';
import Colors, { AppBackgroundColor } from '../../../styles/colors';
import Borders from '../../../styles/borders';
import LiTextInput from '../../../component/LiTextInput/LiTextInput';
import LiPressable from '../../../component/LiPressable/LiPressable';
import { createComment } from '../../../api/comments-api';
import { nonEmptyOrNull } from '../../../util/string-helper';

const NewComment = ({ questionId, addComment }) => {
    const [comment, setComment] = useState(null);
    const [isCommenting, setIsCommenting] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    function onCommentClicked() {
        setIsCommenting(true);
        createComment(questionId, comment)
            .then(res => {
                if (res.data?.status) {
                    addComment(res.data.data);
                    setComment(null);
                }
                setIsCommenting(false);
            })
            .catch(() => setIsCommenting(false));
    }

    useEffect(() => {
        setIsFormValid(nonEmptyOrNull(comment));
    }, [comment]);

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
                    value={comment}
                    onChangeText={setComment}
                    placeholder={'Votre commentaire ici..'}
                />
            </View>
            <LiPressable
                onPressIn={onCommentClicked}
                disable={!isFormValid || isCommenting}
                title={'Poster'}
            />
        </View>
    );
};

export default NewComment;

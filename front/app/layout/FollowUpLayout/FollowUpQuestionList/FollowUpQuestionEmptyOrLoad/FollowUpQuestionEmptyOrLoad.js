import React from 'react';
import LiText from '../../../../component/LiText/LiText';
import { View } from 'react-native';

const FollowUpQuestionEmptyOrLoad = ({ isLoading }) => {
    const viewStyle = {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    };

    return (
        <View style={viewStyle}>
            <LiText>
                {isLoading
                    ? 'Chargement des questions suivies…'
                    : 'Vous ne suivez aucune question'}
            </LiText>
        </View>
    );
};

export default FollowUpQuestionEmptyOrLoad;

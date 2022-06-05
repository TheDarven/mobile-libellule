import React from 'react';
import LiText from '../../../component/LiText/LiText';
import { View } from 'react-native';

const IndexQuestionsEmptyOrLoad = ({ isLoading }) => {
    const viewStyle = {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    };

    return (
        <View style={viewStyle}>
            <LiText>
                {isLoading
                    ? 'Chargement des questions…'
                    : "Aucune question n'est présente"}
            </LiText>
        </View>
    );
};

export default IndexQuestionsEmptyOrLoad;

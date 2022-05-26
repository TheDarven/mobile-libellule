import React from 'react';
import LiText from '../../../component/LiText/LiText';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Spacings from '../../../styles/spacings';
import { useColorScheme, View } from 'react-native';
import Colors from '../../../styles/colors';

const QuestionEmptyOrLoad = ({ isLoading }) => {
    const isDarkMode = useColorScheme() === 'dark';

    const viewStyle = {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    };

    const questionNotExistIconColor = isDarkMode
        ? Colors.warning._20
        : Colors.warning._50;

    const questionNotExistStyle = {
        marginTop: Spacings._16
    };

    return (
        <View style={viewStyle}>
            {isLoading ? (
                <LiText>Chargement de la question…</LiText>
            ) : (
                <>
                    <FontAwesome
                        name={'bug'}
                        size={96}
                        color={questionNotExistIconColor}
                    />
                    <LiText style={questionNotExistStyle}>
                        La question n'existe pas ou plus
                    </LiText>
                </>
            )}
        </View>
    );
};

export default QuestionEmptyOrLoad;

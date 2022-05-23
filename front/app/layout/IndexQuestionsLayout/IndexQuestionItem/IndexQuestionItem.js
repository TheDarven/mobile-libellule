import React from 'react';
import { useColorScheme, View } from 'react-native';
import Spacings from '../../../styles/spacings';
import LiText from '../../../component/LiText/LiText';
import Colors from '../../../styles/colors';
import Borders from '../../../styles/borders';
import Fonts from '../../../styles/fonts';
import LiPressable, {
    LiPressableSize
} from '../../../component/LiPressable/LiPressable';
import LiCard from '../../../component/LiCard/LiCard';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const IndexQuestionItem = ({ title, author, content, nbComments }) => {
    const isDarkMode = useColorScheme() === 'dark';

    const iconColor = isDarkMode ? Colors.gray._0 : Colors.black._20;

    const cardStyle = {
        marginBottom: Spacings._16
    };

    const cardHeaderStyle = {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacings._8
    };

    const cardHeaderDateStyle = {
        backgroundColor: isDarkMode ? Colors.black._80 : Colors.white._50,
        paddingHorizontal: Spacings._8,
        paddingVertical: Spacings._4,
        borderRadius: Borders.radius._8
    };

    const cardHeaderDateTextStyle = {
        color: isDarkMode ? Colors.white._100 : Colors.black._50
    };

    const cardTitleStyle = {
        fontWeight: '700',
        marginBottom: Spacings._8
    };

    const cardContentStyle = {
        marginBottom: Spacings._16,
        color: isDarkMode ? Colors.gray._0 : Colors.black._50
    };

    const cardFooterStyle = {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    };

    const cardFooterCommentStyle = {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: Spacings._4
    };

    const cardFooterCommentTextStyle = {
        marginLeft: Spacings._8,
        color: iconColor
    };

    return (
        <LiCard
            style={cardStyle}
            onTouchEnd={() => {
                console.log('1');
            }}>
            <View style={cardHeaderStyle}>
                <LiText>{author}</LiText>
                <View style={cardHeaderDateStyle}>
                    <LiText
                        fontSize={Fonts.size.sm}
                        style={cardHeaderDateTextStyle}>
                        12 Janvier 2022
                    </LiText>
                </View>
            </View>
            <LiText style={cardTitleStyle} fontSize={Fonts.size.lg}>
                {title}
            </LiText>
            <LiText style={cardContentStyle}>{content}</LiText>
            <View style={cardFooterStyle}>
                <View style={cardFooterCommentStyle}>
                    <FontAwesome
                        name={'comment-o'}
                        size={Fonts.size.md}
                        color={iconColor}
                    />
                    <LiText style={cardFooterCommentTextStyle}>
                        {nbComments}
                    </LiText>
                </View>
                <LiPressable title={'Regarder'} size={LiPressableSize.small} />
            </View>
        </LiCard>
    );
};

export default IndexQuestionItem;

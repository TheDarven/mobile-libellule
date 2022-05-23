import React from 'react';
import { ScrollView, useColorScheme, View } from 'react-native';
import Colors, { AppBackgroundColor } from '../../styles/colors';
import Spacings from '../../styles/spacings';
import QuestionHeaderLayout from '../../layout/QuestionLayout/QuestionHeaderLayout/QuestionHeaderLayout';
import QuestionCommentsLayout from '../../layout/QuestionCommentsLayout/QuestionCommentsLayout';
import LiTitle from '../../component/LiTitle/LiTitle';
import LiText from '../../component/LiText/LiText';
import Fonts from '../../styles/fonts';
import LiTextInput from '../../component/LiTextInput/LiTextInput';
import LiPressable from '../../component/LiPressable/LiPressable';
import Borders from '../../styles/borders';
import LiSeparator from '../../component/LiSeparator/LiSeparator';

const QuestionScreen = ({ route }) => {
    const { questionId } = route?.params;

    const question = {
        question_id: 1,
        author: 'JeanPatrick',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur autem consectetur consequuntur delectus itaque nam non odit, similique totam veniam. Animi aperiam eos mollitia numquam optio soluta totam velit voluptate?',
        title: "Je n'arrive pas à boire de l'eau",
        nbComments: 5
    };

    const comments = [
        {
            commentId: 1,
            author: 'Paul',
            content:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias assumenda id recusandae totam voluptas. Ad adipisci architecto dolorum incidunt laboriosam non officiis perspiciatis quidem, quisquam similique soluta, voluptatibus. Quia, repellendus.',
            date: '12 Janvier 2022 à 08h45'
        },
        {
            commentId: 2,
            author: 'John Doe',
            content: 'Un commentaire !',
            date: '12 Janvier 2022 à 11h21'
        },
        {
            commentId: 3,
            author: 'Paul',
            content:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias assumenda id recusandae totam voluptas. Ad adipisci architecto dolorum incidunt laboriosam non officiis perspiciatis quidem, quisquam similique soluta, voluptatibus. Quia, repellendus.',
            date: '12 Janvier 2022 à 08h45'
        },
        {
            commentId: 4,
            author: 'John Doe',
            content: 'Un commentaire !',
            date: '12 Janvier 2022 à 11h21'
        },
        {
            commentId: 5,
            author: 'Louis',
            content: 'Dernier commentaire',
            date: '12 Janvier 2022 à 11h30'
        }
    ];

    const isDarkMode = useColorScheme() === 'dark';

    const viewStyle = {
        backgroundColor: isDarkMode ? Colors.black._100 : Colors.white._0,
        paddingHorizontal: Spacings._20,
        paddingVertical: Spacings._16
    };

    const contentTextStyle = {
        marginBottom: Spacings._16,
        color: isDarkMode ? Colors.gray._0 : Colors.black._50
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                style={viewStyle}
                contentContainerStyle={{ paddingBottom: Spacings._8 }}>
                <LiTitle fontSize={Fonts.size.xl_2}>{question.title}</LiTitle>
                <QuestionHeaderLayout
                    author={question.author}
                    date={'12 Janvier 2022'}
                />
                <LiText style={contentTextStyle}>{question.content}</LiText>
                <LiSeparator
                    style={{
                        marginTop: Spacings._20,
                        marginBottom: Spacings._24
                    }}
                />
                <LiTitle fontSize={Fonts.size.xl}>Commentaires</LiTitle>
                <QuestionCommentsLayout comments={comments} />
            </ScrollView>
            <View
                style={{
                    paddingHorizontal: Spacings._12,
                    paddingVertical: Spacings._12,
                    backgroundColor: isDarkMode
                        ? AppBackgroundColor.dark
                        : Colors.white._50,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderRadius: Borders.radius._4,
                    shadowColor: '#000'
                }}>
                <View style={{ flex: 1, marginRight: Spacings._12 }}>
                    <LiTextInput
                        multiline={true}
                        numberOfLines={2}
                        style={{
                            textAlignVertical: 'top',
                            paddingBottom: Spacings._4,
                            paddingTop: Spacings._12
                        }}
                        placeholderTextColor={'Votre commentaire ici..'}
                    />
                </View>
                <LiPressable title={'Poster'} />
            </View>
        </View>
    );
};

export default QuestionScreen;

import React from 'react';
import IndexQuestionItem from './IndexQuestionItem/IndexQuestionItem';
import { View } from 'react-native';
import Spacings from '../../styles/spacings';
import LiText from '../../component/LiText/LiText';
import Fonts from '../../styles/fonts';
import LiTitle from '../../component/LiTitle/LiTitle';

const IndexQuestionsLayout = () => {
    const questions = [
        {
            question_id: 1,
            author: 'JeanPatrick',
            content:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur autem consectetur consequuntur delectus itaque nam non odit, similique totam veniam. Animi aperiam eos mollitia numquam optio soluta totam velit voluptate?',
            title: "Je n'arrive pas à boire de l'eau",
            nbComments: 5
        },
        {
            question_id: 2,
            author: 'Pierre',
            content:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur autem consectetur consequuntur delectus itaque nam non odit, similique totam veniam. Animi aperiam eos mollitia numquam optio soluta totam velit voluptate?',
            title: "J'ai perdu 5€",
            nbComments: 0
        },
        {
            question_id: 3,
            author: 'Paul',
            content: 'Un autre problème haha',
            title: 'Boire ou conduire, pourquoi choisir ?',
            nbComments: 37
        }
    ];

    return (
        <View style={{ paddingBottom: Spacings._32 }}>
            <LiTitle>Dernières questions</LiTitle>

            {questions.map(question => (
                <IndexQuestionItem
                    key={question.question_id}
                    author={question.author}
                    content={question.content}
                    title={question.title}
                    nbComments={question.nbComments}
                />
            ))}
        </View>
    );
};

export default IndexQuestionsLayout;

import React, { useEffect, useState } from 'react';
import LiTitle from '../../../component/LiTitle/LiTitle';
import Spacings from '../../../styles/spacings';
import LiMainFlatList from '../../../component/LiMainFlatList/LiMainFlatList';
import LiMainView, {
    MainContent
} from '../../../component/LiMainView/LiMainView';
import { View } from 'react-native';
import FollowUpQuestionItem from './FollowUpQuestionItem/FollowUpQuestionItem';
import {
    deleteFollowQuestion,
    getAllFollowQuestions
} from '../../../api/follow-question-api';

const FollowUpQuestionList = () => {
    const [followQuestions, setFollowQuestions] = useState([
        {
            questionId: 1,
            title: 'A title',
            author: 'Name of author',
            date: '2022-06-03T11:18:08.000Z',
            nbComments: 12
        },
        {
            questionId: 2,
            title: 'A title',
            author: 'Name of author',
            date: '2022-06-03T11:18:08.000Z',
            nbComments: 12
        },
        {
            questionId: 3,
            title: 'A title',
            author: 'Name of author',
            date: '2022-06-03T11:18:08.000Z',
            nbComments: 12
        },
        {
            questionId: 4,
            title: 'A title',
            author: 'Name of author',
            date: '2022-06-03T11:18:08.000Z',
            nbComments: 12
        },
        {
            questionId: 5,
            title: 'A title',
            author: 'Name of author',
            date: '2022-06-03T11:18:08.000Z',
            nbComments: 12
        }
    ]);

    useEffect(() => {
        getAllFollowQuestions().then(res => console.log(res.data));
    }, []);

    /*
    TODO: Questions suivies (nb)
    questionId (+ unfollow), titre, auteur, nbComments, date
     */

    const separatorStyle = {
        width: Spacings._16
    };

    function unfollowQuestion(questionId) {
        deleteFollowQuestion(questionId).then(res => {
            if (res.data.status) {
                setFollowQuestions([
                    ...followQuestions.filter(
                        followQuestion =>
                            followQuestion.questionId !== questionId
                    )
                ]);
            }
        });
    }

    return (
        <>
            <LiMainView type={MainContent.default} style={{ paddingBottom: 0 }}>
                <LiTitle style={{ paddingHorizontal: Spacings._8 }}>
                    Questions suivies ({followQuestions.length})
                </LiTitle>
            </LiMainView>
            <View>
                <LiMainFlatList
                    horizontal={true}
                    data={followQuestions}
                    renderItem={item => (
                        <FollowUpQuestionItem
                            item={item}
                            unfollowQuestion={unfollowQuestion}
                        />
                    )}
                    type={MainContent.none}
                    contentContainerStyle={{ paddingHorizontal: Spacings._20 }}
                    ItemSeparatorComponent={() => (
                        <View style={separatorStyle} />
                    )}
                />
            </View>

            {/*isLoading ? (
                <FollowUpQuestionEmptyOrLoad isLoading={isLoading} />
            ) : (
                <></>
            )*/}
        </>
    );
};

export default FollowUpQuestionList;

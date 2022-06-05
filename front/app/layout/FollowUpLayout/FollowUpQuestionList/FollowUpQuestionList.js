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
import { useIsFocused } from '@react-navigation/native';

const FollowUpQuestionList = () => {
    const [followQuestions, setFollowQuestions] = useState([]);

    const isFocus = useIsFocused();

    useEffect(() => {
        if (!isFocus) {
            return;
        }
        getAllFollowQuestions()
            .then(res => {
                if (res.data.status) {
                    setFollowQuestions(res.data.data);
                } else {
                    setFollowQuestions([]);
                }
                console.log(res.data);
            })
            .catch(() => setFollowQuestions([]));
    }, [isFocus]);

    /*
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

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
                if (res.data.status && res.data.data != null) {
                    setFollowQuestions(res.data.data);
                } else {
                    setFollowQuestions([]);
                }
            })
            .catch(() => setFollowQuestions([]));
    }, [isFocus]);

    const separatorStyle = {
        width: Spacings._16
    };

    function unfollowQuestion(questionId) {
        deleteFollowQuestion(questionId).then(res => {
            if (res.data.status) {
                setFollowQuestions([
                    ...followQuestions.filter(
                        followQuestion =>
                            followQuestion.Question.questionId !== questionId
                    )
                ]);
            }
        });
    }

    return (
        <>
            <LiMainView type={MainContent.default} style={{ paddingBottom: 0 }}>
                <LiTitle>Questions suivies ({followQuestions.length})</LiTitle>
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
                    type={MainContent.card}
                    contentContainerStyle={{ paddingRight: Spacings._20 }}
                    style={{ paddingTop: Spacings._0 }}
                    ItemSeparatorComponent={() => (
                        <View style={separatorStyle} />
                    )}
                />
            </View>
        </>
    );
};

export default FollowUpQuestionList;

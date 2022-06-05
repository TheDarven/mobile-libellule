import React, { useEffect, useMemo, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import {
    getAllFollowQuestionAlerts,
    resetFollowQuestion
} from '../../api/follow-question-api';
import {
    getAllFollowUserAlerts,
    resetFollowUser
} from '../../api/follow-user-api';
import { View } from 'react-native';
import LiMainFlatList from '../../component/LiMainFlatList/LiMainFlatList';
import LiText from '../../component/LiText/LiText';
import LiTitle from '../../component/LiTitle/LiTitle';
import Spacings from '../../styles/spacings';
import LiMainView, { MainContent } from '../../component/LiMainView/LiMainView';
import FollowUpAlertsItem from './FollowUpAlertsItem/FollowUpAlertsItem';
import FollowUpUserList from '../FollowUpLayout/FollowUpUserList/FollowUpUserList';
import FollowUpQuestionList from '../FollowUpLayout/FollowUpQuestionList/FollowUpQuestionList';

export const FollowUpType = {
    question: 'question',
    user: 'user'
};

const FollowUpAlertsLayout = () => {
    const [questionAlerts, setQuestionAlerts] = useState([]);

    const [userAlerts, setUserAlerts] = useState([]);

    const [alerts, setAlerts] = useState([]);

    const isFocus = useIsFocused();

    useEffect(() => {
        setAlerts([...questionAlerts, ...userAlerts]);
    }, [questionAlerts, userAlerts]);

    useEffect(() => {
        if (!isFocus) {
            return;
        }
        getAllFollowQuestionAlerts()
            .then(res => {
                if (res.data.status && res.data.data != null) {
                    const formattedQuestions = res.data.data.map(question => {
                        return { ...question, type: FollowUpType.question };
                    });
                    setQuestionAlerts(formattedQuestions);
                } else {
                    setQuestionAlerts([]);
                }
            })
            .catch(() => setQuestionAlerts([]));
        getAllFollowUserAlerts()
            .then(res => {
                if (res.data.status && res.data.data) {
                    const formattedUsers = res.data.data.map(user => {
                        return { ...user, type: FollowUpType.user };
                    });
                    setUserAlerts(formattedUsers);
                } else {
                    setUserAlerts([]);
                }
            })
            .catch(() => setUserAlerts([]));
    }, [isFocus]);

    async function deleteFollowQuestionAlert(questionId) {
        const res = await resetFollowQuestion(questionId);
        if (res.data.status) {
            setQuestionAlerts([
                ...questionAlerts.filter(
                    questionAlert =>
                        questionAlert.Question.questionId !== questionId
                )
            ]);
        }
    }

    async function deleteFollowUserAlert(userId) {
        const res = await resetFollowUser(userId);
        if (res.data.status) {
            setUserAlerts([
                ...userAlerts.filter(
                    userAlert => userAlert.User.userId !== userId
                )
            ]);
        }
    }

    const listHeader = useMemo(() => {
        return (
            <>
                <FollowUpUserList />
                <FollowUpQuestionList />
                <LiMainView
                    type={MainContent.default}
                    style={{ paddingBottom: 0 }}>
                    <LiTitle>Activitées</LiTitle>
                </LiMainView>
            </>
        );
    }, []);

    return (
        <View>
            <LiMainFlatList
                ListEmptyComponent={
                    <LiMainView
                        type={MainContent.default}
                        style={{ paddingVertical: Spacings._0 }}>
                        <LiText>Aucune activitée</LiText>
                    </LiMainView>
                }
                data={alerts}
                type={MainContent.none}
                style={{ height: '100%' }}
                ListHeaderComponent={listHeader}
                renderItem={item => (
                    <FollowUpAlertsItem
                        item={item}
                        deleteFollowQuestionAlert={deleteFollowQuestionAlert}
                        deleteFollowUserAlert={deleteFollowUserAlert}
                    />
                )}
            />
        </View>
    );
};

export default FollowUpAlertsLayout;

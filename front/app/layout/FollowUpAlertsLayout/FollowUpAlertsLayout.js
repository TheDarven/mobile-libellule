import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { getAllFollowQuestionAlerts } from '../../api/follow-question-api';
import { getAllFollowUserAlerts } from '../../api/follow-user-api';
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
        setAlerts([...questionAlerts, userAlerts]);
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
        getAllFollowUserAlerts().then(res => {
            // console.log(res.data);
        });
    }, [isFocus]);

    return (
        <View>
            <LiMainFlatList
                ListEmptyComponent={() => (
                    <LiMainView
                        type={MainContent.default}
                        style={{ paddingVertical: Spacings._0 }}>
                        <LiText>Aucune activitée</LiText>
                    </LiMainView>
                )}
                data={alerts}
                type={MainContent.none}
                style={{ height: '100%' }}
                ListHeaderComponent={() => (
                    <>
                        <FollowUpUserList />
                        <FollowUpQuestionList />
                        <LiMainView
                            type={MainContent.default}
                            style={{ paddingBottom: 0 }}>
                            <LiTitle>Activitées</LiTitle>
                        </LiMainView>
                    </>
                )}
                renderItem={item => <FollowUpAlertsItem item={item} />}
            />
        </View>
    );
};

export default FollowUpAlertsLayout;

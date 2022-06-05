import React, { useEffect } from 'react';
import { useAuth } from '../../context/auth-context';
import { useNavigation } from '@react-navigation/native';
import FollowUpUserList from '../../layout/FollowUpLayout/FollowUpUserList/FollowUpUserList';
import FollowUpQuestionList from '../../layout/FollowUpLayout/FollowUpQuestionList/FollowUpQuestionList';
import LiMainView, { MainContent } from '../../component/LiMainView/LiMainView';
import FollowUpAlertsLayout from '../../layout/FollowUpAlertsLayout/FollowUpAlertsLayout';

const FollowUpScreen = () => {
    const { isAuth } = useAuth().authContext;

    const navigation = useNavigation();

    useEffect(() => {
        if (!isAuth()) {
            navigation.navigate('Libellule');
        }
    }, [isAuth, navigation]);

    return <>{isAuth() && <FollowUpAlertsLayout />}</>;
};

export default FollowUpScreen;

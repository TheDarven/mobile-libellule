import React, { useEffect } from 'react';
import { useAuth } from '../../context/auth-context';
import { useNavigation } from '@react-navigation/native';
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

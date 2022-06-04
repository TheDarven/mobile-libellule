import React, { useEffect } from 'react';
import { useAuth } from '../../context/auth-context';
import { useNavigation } from '@react-navigation/native';
import FollowUpUserList from '../../layout/FollowUpLayout/FollowUpUserList/FollowUpUserList';
import FollowUpQuestionList from '../../layout/FollowUpLayout/FollowUpQuestionList/FollowUpQuestionList';
import LiMainView, { MainContent } from '../../component/LiMainView/LiMainView';

const FollowUpScreen = () => {
    const { isAuth } = useAuth().authContext;

    const navigation = useNavigation();

    useEffect(() => {
        if (!isAuth()) {
            navigation.navigate('Libellule');
        }
    }, [isAuth, navigation]);

    const viewStyle = {
        flex: 1
    };

    return (
        <LiMainView style={viewStyle} type={MainContent.none}>
            <FollowUpUserList />
            <FollowUpQuestionList />
        </LiMainView>
    );
};

export default FollowUpScreen;

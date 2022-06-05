import React, { useEffect, useState } from 'react';
import LiMainView, {
    MainContent
} from '../../../component/LiMainView/LiMainView';
import LiTitle from '../../../component/LiTitle/LiTitle';
import Spacings from '../../../styles/spacings';
import LiMainFlatList from '../../../component/LiMainFlatList/LiMainFlatList';
import { View } from 'react-native';
import FollowUpUserItem from './FollowUpUserItem/FollowUpUserItem';
import {
    deleteFollowUser,
    getAllFollowUsers
} from '../../../api/follow-user-api';
import { useIsFocused } from '@react-navigation/native';
import LiText from '../../../component/LiText/LiText';

const FollowUpUserList = () => {
    const [followUsers, setFollowUsers] = useState([]);

    const isFocus = useIsFocused();

    useEffect(() => {
        if (!isFocus) {
            return () => {};
        }
        getAllFollowUsers()
            .then(res => {
                if (res.data.status && res.data.data != null) {
                    setFollowUsers(res.data.data);
                } else {
                    setFollowUsers([]);
                }
            })
            .catch(() => setFollowUsers([]));
    }, [isFocus]);

    function removeFollowUser(userId) {
        deleteFollowUser(userId).then(res => {
            if (res.data.status) {
                setFollowUsers([
                    ...followUsers.filter(
                        followUser => followUser.User.userId !== userId
                    )
                ]);
            }
        });
    }

    return (
        <>
            <LiMainView type={MainContent.default} style={{ paddingBottom: 0 }}>
                <LiTitle>Utilisateurs suivis ({followUsers.length})</LiTitle>
            </LiMainView>
            <View>
                <LiMainFlatList
                    horizontal={true}
                    ListEmptyComponent={() => (
                        <LiText>Vous ne suivez aucun utilisateur !</LiText>
                    )}
                    data={followUsers}
                    renderItem={item => (
                        <FollowUpUserItem
                            item={item}
                            removeFollowUser={removeFollowUser}
                        />
                    )}
                    type={MainContent.card}
                    contentContainerStyle={{ paddingRight: Spacings._20 }}
                    style={{ paddingTop: Spacings._0 }}
                    ItemSeparatorComponent={() => (
                        <View style={{ width: Spacings._16 }} />
                    )}
                />
            </View>
        </>
    );
};

export default FollowUpUserList;

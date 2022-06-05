import React, { useState } from 'react';
import LiMainView, {
    MainContent
} from '../../../component/LiMainView/LiMainView';
import LiTitle from '../../../component/LiTitle/LiTitle';
import Spacings from '../../../styles/spacings';
import LiMainFlatList from '../../../component/LiMainFlatList/LiMainFlatList';
import { View } from 'react-native';
import FollowUpUserItem from './FollowUpUserItem/FollowUpUserItem';
import { deleteFollowUser } from '../../../api/follow-user-api';

const FollowUpUserList = () => {
    const [followUsers, setFollowUsers] = useState([
        {
            targetId: 1,
            userName: 'A name a name a name a name',
            nbComments: 50,
            nbQuestions: 12,
            nbFollowers: 47
        },
        {
            targetId: 2,
            userName: 'A name',
            nbComments: 50,
            nbQuestions: 12,
            nbFollowers: 47
        },
        {
            targetId: 3,
            userName: 'A name',
            nbComments: 50,
            nbQuestions: 12,
            nbFollowers: 47
        },
        {
            targetId: 4,
            userName: 'A name',
            nbComments: 50,
            nbQuestions: 12,
            nbFollowers: 47
        },
        {
            targetId: 5,
            userName: 'A name',
            nbComments: 50,
            nbQuestions: 12,
            nbFollowers: 47
        }
    ]);

    function removeFollowUser(targetId) {
        deleteFollowUser(targetId).then(res => {
            if (res.data.status) {
                setFollowUsers([
                    ...followUsers.filter(
                        followUser => followUser.targetId !== targetId
                    )
                ]);
            }
        });
    }

    /*
    TODO: Utilisateurs suivis (nb)
    TODO: Verifier les données (targetId, userName, nbCommentaires, nbQuestions, nbSuiveurs)
    */

    return (
        <>
            <LiMainView type={MainContent.default} style={{ paddingBottom: 0 }}>
                <LiTitle style={{ paddingHorizontal: Spacings._8 }}>
                    Utilisateurs suivis (10)
                </LiTitle>
            </LiMainView>
            <View>
                <LiMainFlatList
                    horizontal={true}
                    data={followUsers}
                    renderItem={item => (
                        <FollowUpUserItem
                            item={item}
                            removeFollowUser={removeFollowUser}
                        />
                    )}
                    type={MainContent.none}
                    contentContainerStyle={{ paddingHorizontal: Spacings._20 }}
                    ItemSeparatorComponent={() => (
                        <View style={{ width: Spacings._16 }} />
                    )}
                />
            </View>
        </>
    );
};

export default FollowUpUserList;

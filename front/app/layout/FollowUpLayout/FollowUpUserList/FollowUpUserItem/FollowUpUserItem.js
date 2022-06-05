import React from 'react';
import FollowUpUser from '../../FollowUpUser/FollowUpUser';

const FollowUpUserItem = ({ item, removeFollowUser }) => {
    const { index } = item;
    const user = item.item;

    return (
        <FollowUpUser
            index={index}
            userName={user.userName}
            nbFollowers={user.nbFollowers}
            nbComments={user.nbComments}
            nbQuestions={user.nbComments}
            targetId={user.targetId}
            removeFollowUser={removeFollowUser}
        />
    );
};

export default FollowUpUserItem;

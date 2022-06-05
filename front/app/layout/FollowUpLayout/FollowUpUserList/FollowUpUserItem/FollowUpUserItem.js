import React from 'react';
import FollowUpUser from '../../FollowUpUser/FollowUpUser';

const FollowUpUserItem = ({ item, removeFollowUser }) => {
    const { index } = item;
    const user = item.item;

    return (
        <FollowUpUser
            index={index}
            userName={user.User.displayName}
            nbFollowers={user.User.nbFollower}
            nbComments={user.User.nbComment}
            nbQuestions={user.User.nbQuestion}
            targetId={user.User.userId}
            removeFollowUser={removeFollowUser}
        />
    );
};

export default FollowUpUserItem;

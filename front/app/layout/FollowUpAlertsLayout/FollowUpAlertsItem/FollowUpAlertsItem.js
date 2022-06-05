import React from 'react';
import { FollowUpType } from '../FollowUpAlertsLayout';
import FollowQuestionAlert from '../../../component/Follow/FollowQuestionAlert/FollowQuestionAlert';
import FollowUserAlert from '../../../component/Follow/FollowUserAlert/FollowUserAlert';
import LiMainView, {
    MainContent
} from '../../../component/LiMainView/LiMainView';
import Spacings from '../../../styles/spacings';

const FollowUpAlertsItem = ({
    item,
    deleteFollowQuestionAlert,
    deleteFollowUserAlert
}) => {
    const { index } = item;
    const followItem = item.item;

    return (
        <LiMainView
            type={MainContent.default}
            index={index}
            style={{ paddingVertical: Spacings._0 }}>
            {followItem.type === FollowUpType.question && (
                <FollowQuestionAlert
                    deleteFollowAlert={deleteFollowQuestionAlert}
                    updateDate={followItem.edition_date}
                    questionId={followItem.Question.questionId}
                    questionTitle={followItem.Question.title}
                    authorName={followItem.Question.User.display_name}
                    alerts={followItem.alerts}
                />
            )}
            {followItem.type === FollowUpType.user && (
                <FollowUserAlert
                    deleteFollowAlert={deleteFollowUserAlert}
                    userName={followItem.User.displayName}
                    userId={followItem.User.userId}
                    updateDate={followItem.edition_date}
                    questions={followItem.questions}
                    comments={followItem.comments}
                />
            )}
        </LiMainView>
    );
};

export default FollowUpAlertsItem;

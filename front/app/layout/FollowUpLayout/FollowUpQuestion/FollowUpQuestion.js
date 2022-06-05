import React from 'react';
import QuestionTitle from '../../../component/Post/Question/QuestionContent/QuestionTitle/QuestionTitle';
import QuestionFooter from '../../../component/Post/Question/QuestionFooter/QuestionFooter';
import LiCard from '../../../component/LiCard/LiCard';
import PostDate from '../../../component/Post/PostHeader/PostDate/PostDate';
import PostAuthor from '../../../component/Post/PostHeader/PostAuthor/PostAuthor';
import Spacings from '../../../styles/spacings';
import { View } from 'react-native';
import FollowUp, {
    FollowType
} from '../../../component/Post/FollowUp/FollowUp';
import LiSeparator from '../../../component/LiSeparator/LiSeparator';

const FollowUpQuestion = ({
    questionId,
    title,
    author,
    date,
    nbComments,
    unfollowQuestion
}) => {
    const cardStyle = {
        width: 256
    };

    const postDateStyle = {
        marginBottom: Spacings._12
    };

    return (
        <LiCard style={cardStyle}>
            <View style={{ marginBottom: Spacings._4 }}>
                <QuestionTitle title={title} />
                <PostAuthor author={author} style={postDateStyle} />
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                    <QuestionFooter nbComments={nbComments} />
                    <PostDate date={date} style={{ alignSelf: 'flex-end' }} />
                </View>
            </View>
            <LiSeparator
                style={{
                    marginTop: Spacings._16,
                    marginBottom: Spacings._8
                }}
            />
            <FollowUp
                isFollowing={true}
                type={FollowType.question}
                style={{ paddingLeft: Spacings._0 }}
                followClicked={() => unfollowQuestion(questionId)}
            />
        </LiCard>
    );
};

export default FollowUpQuestion;

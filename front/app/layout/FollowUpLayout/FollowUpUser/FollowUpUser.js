import React from 'react';
import LiCard from '../../../component/LiCard/LiCard';
import Spacings from '../../../styles/spacings';
import { View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Fonts from '../../../styles/fonts';
import LiTitle from '../../../component/LiTitle/LiTitle';
import ValueItem from '../../../component/ValueItem/ValueItem';
import FollowUp, {
    FollowType
} from '../../../component/Post/FollowUp/FollowUp';
import LiSeparator from '../../../component/LiSeparator/LiSeparator';

const FollowUpUser = ({
    targetId,
    userName,
    nbComments,
    nbQuestions,
    nbFollowers,
    removeFollowUser
}) => {
    const cardStyle = {
        width: 256,
        justifyContent: 'space-between'
    };

    return (
        <LiCard style={cardStyle}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    marginBottom: Spacings._12
                }}>
                <Feather
                    style={{
                        marginRight: Spacings._8,
                        marginTop: Spacings._4
                    }}
                    name={'user'}
                    size={Fonts.size.lg}
                />
                <LiTitle
                    style={{
                        fontWeight: '700',
                        marginBottom: Spacings._0,
                        flex: 1
                    }}
                    fontSize={Fonts.size.lg}>
                    {userName}
                </LiTitle>
            </View>
            <View>
                <ValueItem label={'Commentaires : '} value={nbComments} />
                <ValueItem label={'Questions : '} value={nbQuestions} />
                <ValueItem label={'Suiveurs : '} value={nbFollowers} />
                <LiSeparator
                    style={{
                        marginTop: Spacings._16,
                        marginBottom: Spacings._8
                    }}
                />
                <FollowUp
                    isFollowing={true}
                    type={FollowType.user}
                    style={{ paddingLeft: Spacings._0 }}
                    followClicked={() => removeFollowUser(targetId)}
                />
            </View>
        </LiCard>
    );
};

export default FollowUpUser;

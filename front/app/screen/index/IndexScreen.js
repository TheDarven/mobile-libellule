import React from 'react';
import LiMainScrollView from '../../component/LiMainScrollView/LiMainScrollView';
import IndexQuestionsLayout from '../../layout/IndexQuestionsLayout/IndexQuestionsLayout';
import { View } from 'react-native';
import LiPressable, {
    LiPressableSize,
    LiPressableType
} from '../../component/LiPressable/LiPressable';
import Spacings from '../../styles/spacings';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../../styles/colors';

const IndexScreen = () => {
    return (
        <View style={{ flex: 1 }}>
            <LiMainScrollView contentInsetAdjustmentBehavior="automatic">
                <IndexQuestionsLayout />
            </LiMainScrollView>
            <View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0
                }}>
                <LiPressable
                    size={LiPressableSize.large}
                    elevation={4}
                    title={'Nouveau post'}
                    type={LiPressableType.secondary}
                    style={{
                        paddingRight: Spacings._24,
                        paddingBottom: Spacings._12
                    }}
                    icon={
                        <Feather
                            name={'edit'}
                            size={16}
                            style={{
                                marginRight: Spacings._8,
                                color: Colors.white._0
                            }}
                        />
                    }
                />
            </View>
        </View>
    );
};

export default IndexScreen;

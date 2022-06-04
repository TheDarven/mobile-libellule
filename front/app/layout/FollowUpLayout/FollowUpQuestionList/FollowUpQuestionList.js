import React, { useState } from 'react';
import LiTitle from '../../../component/LiTitle/LiTitle';
import Spacings from '../../../styles/spacings';
import LiMainFlatList from '../../../component/LiMainFlatList/LiMainFlatList';
import LiMainView, {
    MainContent
} from '../../../component/LiMainView/LiMainView';
import { View } from 'react-native';
import FollowUpQuestionItem from './FollowUpQuestionItem/FollowUpQuestionItem';

const FollowUpQuestionList = () => {
    const [isLoading, setIsLoading] = useState(false);

    /*
    TODO: Questions suivies (nb)
    titre, auteur, nbComments, date
    Boutton ne plus suivre
     */

    const data = [
        {
            title: 'A title',
            author: 'Name of author',
            date: '2022-06-03T11:18:08.000Z',
            nbComments: 12
        },
        {
            title: 'A title',
            author: 'Name of author',
            date: '2022-06-03T11:18:08.000Z',
            nbComments: 12
        },
        {
            title: 'A title',
            author: 'Name of author',
            date: '2022-06-03T11:18:08.000Z',
            nbComments: 12
        },
        {
            title: 'A title',
            author: 'Name of author',
            date: '2022-06-03T11:18:08.000Z',
            nbComments: 12
        },
        {
            title: 'A title',
            author: 'Name of author',
            date: '2022-06-03T11:18:08.000Z',
            nbComments: 12
        }
    ];

    const separatorStyle = {
        width: Spacings._16
    };

    return (
        <>
            <LiMainView type={MainContent.default} style={{ paddingBottom: 0 }}>
                <LiTitle style={{ paddingHorizontal: Spacings._8 }}>
                    Questions suivies (10)
                </LiTitle>
            </LiMainView>
            <View>
                <LiMainFlatList
                    horizontal={true}
                    data={data}
                    renderItem={item => <FollowUpQuestionItem item={item} />}
                    type={MainContent.none}
                    contentContainerStyle={{ paddingHorizontal: Spacings._20 }}
                    ItemSeparatorComponent={() => (
                        <View style={separatorStyle} />
                    )}
                />
            </View>

            {/*isLoading ? (
                <FollowUpQuestionEmptyOrLoad isLoading={isLoading} />
            ) : (
                <></>
            )*/}
        </>
    );
};

export default FollowUpQuestionList;

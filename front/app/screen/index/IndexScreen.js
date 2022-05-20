import React from 'react';
import {
    DebugInstructions,
    LearnMoreLinks,
    ReloadInstructions
} from 'react-native/Libraries/NewAppScreen';
import {
    Button,
    ScrollView,
    StyleSheet,
    useColorScheme,
    View
} from 'react-native';
import { MainLayout } from '../../layout/main/MainLayout';
import Text from '../../component/text/Text';
import Fonts from '../../styles/fonts';
import Section from '../../component/section/Section';
import Colors from '../../styles/colors';
import Spacings from '../../styles/spacings';

const IndexScreen = ({ navigation }) => {
    const cardStyle = {
        backgroundColor: Colors.white._0,
        borderRadius: 12,
        paddingHorizontal: Spacings._16,
        paddingVertical: Spacings._12,
        shadowColor: Colors.black._20
    };

    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.black._100 : Colors.white._50
    };

    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={backgroundStyle}>
            <View>
                <MainLayout>
                    <Button
                        title={'Go to test page'}
                        onPress={() => navigation.push('Test')}
                    />
                    <Button
                        title={'Go to index page'}
                        onPress={() => navigation.push('Drawer')}
                    />

                    <Text fontSize={Fonts.size.xxl}>
                        An extra extra large text
                    </Text>
                    <Text fontSize={Fonts.size.xl}>An extra large text</Text>
                    <Text fontSize={Fonts.size.lg}>A large text</Text>
                    <Text fontSize={Fonts.size.md}>A medium text</Text>
                    <Text fontSize={Fonts.size.sm}>A small text</Text>
                    <Text fontSize={Fonts.size.xs}>An extra small text</Text>
                </MainLayout>
                <MainLayout>
                    <View elevation={2} style={cardStyle}>
                        <Text>Un texte omg</Text>
                    </View>
                </MainLayout>
                <Section title="Step One">
                    Edit <Text style={styles.highlight}>App.js</Text> to change
                    this screen and then come back to see your edits.
                </Section>
                <Section title="See Your Changes">
                    <ReloadInstructions />
                </Section>
                <Section title="Debug">
                    <DebugInstructions />
                </Section>
                <Section title="Learn More">
                    Read the docs to discover what to do next:
                </Section>
                <LearnMoreLinks />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    highlight: {
        fontWeight: '700'
    }
});

export default IndexScreen;

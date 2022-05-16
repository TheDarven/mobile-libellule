import React from 'react';
import {
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions
} from 'react-native/Libraries/NewAppScreen';
import { ScrollView, StyleSheet, useColorScheme, View } from 'react-native';
import { MainLayout } from '../../layout/main/MainLayout';
import Text from '../../component/text/Text';
import Fonts from '../../styles/fonts';
import Colors from '../../styles/colors';
import Section from '../../component/section/Section';
import colors from '../../styles/colors';
import spacings from '../../styles/spacings';

const IndexPage = () => {
    return (
        <ScrollView contentInsetAdjustmentBehavior="automatic">
            <View>
                <MainLayout>
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
                    <View
                        elevation={2}
                        style={{
                            backgroundColor: colors.white._0,
                            borderRadius: 12,
                            paddingHorizontal: spacings._16,
                            paddingVertical: spacings._12,
                            shadowColor: colors.black._20
                        }}>
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

export default IndexPage;

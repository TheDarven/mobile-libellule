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
import LiText from '../../component/LiText/LiText';
import Fonts from '../../styles/fonts';
import Section from '../../component/Section/Section';
import Colors from '../../styles/colors';
import Spacings from '../../styles/spacings';
import Borders from '../../styles/borders';
import { useAuth } from '../../context/auth-context';

const IndexScreen = ({ navigation }) => {
    const cardStyle = {
        backgroundColor: Colors.white._0,
        borderRadius: Borders.radius._12,
        paddingHorizontal: Spacings._16,
        paddingVertical: Spacings._12,
        shadowColor: Colors.black._20
    };

    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.black._100 : Colors.white._50
    };

    const { authContext } = useAuth();

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

                    {authContext.token ? (
                        <Button
                            title={'Reset token'}
                            onPress={() => authContext.setToken(null)}
                        />
                    ) : (
                        <></>
                    )}

                    <LiText fontSize={Fonts.size.xl_3}>
                        An extra extra extra large text
                    </LiText>
                    <LiText fontSize={Fonts.size.xl_2}>
                        An extra extra large text
                    </LiText>
                    <LiText fontSize={Fonts.size.xl}>
                        An extra large text
                    </LiText>
                    <LiText fontSize={Fonts.size.lg}>A large text</LiText>
                    <LiText fontSize={Fonts.size.md}>A medium text</LiText>
                    <LiText fontSize={Fonts.size.sm}>A small text</LiText>
                </MainLayout>
                <MainLayout>
                    <View elevation={2} style={cardStyle}>
                        <LiText>Un texte omg</LiText>
                    </View>
                </MainLayout>
                <Section title="Step One">
                    Edit <LiText style={styles.highlight}>App.js</LiText> to
                    change this screen and then come back to see your edits.
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

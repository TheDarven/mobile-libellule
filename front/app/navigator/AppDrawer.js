import React from 'react';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColorScheme, View } from 'react-native';
import IndexScreen from '../screen/index/IndexScreen';
import NavigatorStyle from './NavigatorStyle';
import LiText from '../component/LiText/LiText';
import Colors from '../styles/colors';
import Spacings from '../styles/spacings';
import Fonts from '../styles/fonts';
import { useAuth } from '../context/auth-context';

const CustomDrawerContent = props => {
    const { authContext } = useAuth();

    const isDarkMode = useColorScheme() === 'dark';

    const inactiveTintColor = isDarkMode ? Colors.white._50 : Colors.black._100;

    const logStatusViewStyle = {
        backgroundColor: NavigatorStyle.backgroundColor,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Spacings._20,
        marginBottom: Spacings._8
    };

    const logStatusTextStyle = {
        color: NavigatorStyle.color,
        lineHeight: Fonts.size.lg
    };

    // Contenu du Drawer
    return (
        <DrawerContentScrollView
            {...props}
            contentContainerStyle={{
                paddingTop: 0
            }}>
            <View style={logStatusViewStyle}>
                <LiText fontSize={Fonts.size.md} style={logStatusTextStyle}>
                    {authContext.isAuth() ? (
                        <>Welcome mon ami :o</>
                    ) : (
                        <>Vous n'êtes pas connecté</>
                    )}
                </LiText>
            </View>

            {authContext.isAuth() ? (
                <>
                    <DrawerItem
                        inactiveTintColor={inactiveTintColor}
                        label={'Se déconnecter'}
                        onPress={() => {
                            props.navigation.closeDrawer();
                            authContext.setToken(null);
                        }}
                    />
                </>
            ) : (
                <>
                    <DrawerItem
                        inactiveTintColor={inactiveTintColor}
                        label={'Connexion'}
                        onPress={() => {
                            props.navigation.closeDrawer();
                            props.navigation.navigate('SignIn');
                        }}
                    />
                    <DrawerItem
                        inactiveTintColor={inactiveTintColor}
                        label={'Inscription'}
                        onPress={() => {
                            props.navigation.closeDrawer();
                            props.navigation.navigate('SignUp');
                        }}
                    />
                </>
            )}
        </DrawerContentScrollView>
    );
};

const AppDrawerScreen = () => {
    const Stack = createNativeStackNavigator();

    // Screens possédant le drawer
    return (
        <Stack.Navigator initialRouteName="Drawer">
            <Stack.Screen
                name="Index"
                component={IndexScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

const AppDrawer = () => {
    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator
            drawerContent={CustomDrawerContent}
            screenOptions={{
                headerTintColor: NavigatorStyle.color,
                headerStyle: {
                    backgroundColor: NavigatorStyle.backgroundColor
                }
            }}>
            <Drawer.Screen name={'Libellule'} component={AppDrawerScreen} />
        </Drawer.Navigator>
    );
};

export default AppDrawer;

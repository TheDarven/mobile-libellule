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
import Colors, { AppBackgroundColor } from '../styles/colors';
import Fonts from '../styles/fonts';
import { useAuth } from '../context/auth-context';
import {
    logStatusTextStyle,
    logStatusViewStyle,
    menuViewStyle
} from './AppDrawerStyle';
import FollowUpScreen from '../screen/follow-up/FollowUpScreen';

const CustomDrawerContent = props => {
    const { authContext } = useAuth();

    const isDarkMode = useColorScheme() === 'dark';

    const inactiveTintColor = isDarkMode ? Colors.white._50 : Colors.black._100;

    const pressColor = isDarkMode ? Colors.black._100 : Colors.white._100;

    const menuBackgroundColor = isDarkMode
        ? AppBackgroundColor.dark
        : AppBackgroundColor.light;

    // Contenu du Drawer
    return (
        <DrawerContentScrollView
            {...props}
            contentContainerStyle={{
                paddingTop: 0,
                height: '100%'
            }}>
            <View style={logStatusViewStyle}>
                <LiText fontSize={Fonts.size.md} style={logStatusTextStyle}>
                    {authContext.isAuth() ? (
                        <>Bonjour {authContext.displayName}</>
                    ) : (
                        <>Vous n'êtes pas connecté</>
                    )}
                </LiText>
            </View>

            <View
                style={{
                    backgroundColor: menuBackgroundColor,
                    ...menuViewStyle
                }}>
                {authContext.isAuth() ? (
                    <>
                        <DrawerItem
                            inactiveTintColor={inactiveTintColor}
                            pressColor={pressColor}
                            label={'Questions'}
                            onPress={() => {
                                props.navigation.closeDrawer();
                                props.navigation.navigate('Libellule');
                            }}
                        />
                        <DrawerItem
                            inactiveTintColor={inactiveTintColor}
                            pressColor={pressColor}
                            label={'Suivis'}
                            onPress={() => {
                                props.navigation.closeDrawer();
                                props.navigation.navigate('Follow up');
                            }}
                        />
                        <View style={{ flex: 1 }} />
                        <DrawerItem
                            inactiveTintColor={inactiveTintColor}
                            pressColor={pressColor}
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
                            pressColor={pressColor}
                            label={'Connexion'}
                            onPress={() => {
                                props.navigation.closeDrawer();
                                props.navigation.navigate('SignIn');
                            }}
                        />
                        <DrawerItem
                            inactiveTintColor={inactiveTintColor}
                            pressColor={pressColor}
                            label={'Inscription'}
                            onPress={() => {
                                props.navigation.closeDrawer();
                                props.navigation.navigate('SignUp');
                            }}
                        />
                    </>
                )}
            </View>
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
            <Drawer.Screen name={'Follow up'} options={{ title: 'Suivis' }} component={FollowUpScreen} />
        </Drawer.Navigator>
    );
};

export default AppDrawer;

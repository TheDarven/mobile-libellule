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
import Text from '../component/text/Text';
import Colors from '../styles/colors';
import Spacings from '../styles/spacings';
import Fonts from '../styles/fonts';

const CustomDrawerContent = props => {
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
        lineHeight: Fonts.size.md
    };

    // Contenu du Drawer
    return (
        <DrawerContentScrollView
            {...props}
            contentContainerStyle={{
                paddingTop: 0
            }}>
            <View style={logStatusViewStyle}>
                <Text fontSize={Fonts.size.sm} style={logStatusTextStyle}>
                    Vous n'êtes pas connecté
                </Text>
            </View>
            <DrawerItem
                inactiveTintColor={inactiveTintColor}
                label={'Connexion'}
                onPress={() => {
                    props.navigation.navigate('SignIn');
                }}
            />
            <DrawerItem
                inactiveTintColor={inactiveTintColor}
                label={'Inscription'}
                onPress={() => {
                    props.navigation.navigate('SignUp');
                }}
            />
        </DrawerContentScrollView>
    );
};

const Stack = createNativeStackNavigator();

const AppDrawerScreen = () => {
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

const Drawer = createDrawerNavigator();

const AppDrawer = () => {
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

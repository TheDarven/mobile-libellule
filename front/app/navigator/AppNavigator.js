import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppDrawer from './AppDrawer';
import LoginScreen from '../screen/login/LoginScreen';
import SignUpScreen from '../screen/signup/SignUpScreen';
import { withAuth } from '../context/auth-context';
import NavigatorStyle from './NavigatorStyle';

const Stack = createNativeStackNavigator();

const AppNavigator = ({ authContext }) => {
    return (
        <Stack.Navigator
            initialRouteName="Drawer"
            screenOptions={{
                headerTintColor: NavigatorStyle.color,
                headerStyle: { backgroundColor: NavigatorStyle.backgroundColor }
            }}>
            {authContext.isAuth() ? (
                <>
                    <Stack.Screen name={'Profil'} component={LoginScreen} />
                </>
            ) : (
                <>
                    <Stack.Screen
                        name={'SignIn'}
                        component={LoginScreen}
                        options={{ title: 'Connexion' }}
                    />
                    <Stack.Screen
                        name={'SignUp'}
                        component={SignUpScreen}
                        options={{ title: 'Inscription' }}
                    />
                </>
            )}
            <Stack.Screen
                name="Drawer"
                component={AppDrawer}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

export default withAuth(AppNavigator);

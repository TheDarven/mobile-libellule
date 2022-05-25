import 'react-native-gesture-handler'; // /!\ Should be the first import /!\
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppNavigator from './app/navigator/AppNavigator';
import { AuthProvider } from './app/context/auth-context';
import AuthInterceptor from './app/api/interceptors/AuthInterceptor';
import toastConfig from './app/util/toast-config';
//import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
    const Stack = createNativeStackNavigator();

    return (
        <AuthProvider>
            <AuthInterceptor>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Root">
                        <Stack.Screen
                            name="Root"
                            component={AppNavigator}
                            options={{ headerShown: false }}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
                <Toast config={toastConfig} />
            </AuthInterceptor>
        </AuthProvider>
    );
};

export default App;

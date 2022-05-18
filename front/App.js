import 'react-native-gesture-handler'; // /!\ Should be the first import /!\
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppNavigator from './app/navigator/AppNavigator';
import { AuthProvider } from './app/context/auth-context';
//import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <AuthProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Root">
                    <Stack.Screen
                        name="Root"
                        component={AppNavigator}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </AuthProvider>
    );
};

export default App;

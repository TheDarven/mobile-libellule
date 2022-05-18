import 'react-native-gesture-handler'; // /!\ Should be the first import /!\
import React from 'react';

import { SafeAreaView, useColorScheme } from 'react-native';
import { RouterProvider } from './app/router-service';
import Router from './app/component/router/Router';
import Colors from './app/styles/colors';
//import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.black._100 : Colors.white._50
    };

    return (
        <RouterProvider>
            <SafeAreaView style={backgroundStyle}>
                {/* <StatusBar
                    barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                /> */}

                <Router />
            </SafeAreaView>
        </RouterProvider>
    );
};

export default App;

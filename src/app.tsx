import 'react-native-gesture-handler';

import React, { ReactElement } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppProvider } from './contexts/app';
import { AuthProvider } from './contexts/auth';
import { PushNotificationProvider } from './contexts/pushNotification';
import { navigationRef } from './routers/rootNavigation';
import { StackNavigator } from './routers/stackNavigator';

import { layout } from './styles/layout';
import { theme } from './styles/theme';

export function App(): ReactElement {
    return (
        <ThemeProvider theme={theme}>
            <SafeAreaProvider style={layout.safeArea}>
                <AppProvider>
                    <AuthProvider>
                        <PushNotificationProvider>
                            <NavigationContainer ref={navigationRef}>
                                <StackNavigator />
                            </NavigationContainer>
                        </PushNotificationProvider>
                    </AuthProvider>
                </AppProvider>
            </SafeAreaProvider>
        </ThemeProvider>
    );
}

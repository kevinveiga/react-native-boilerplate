import React from 'react';
import { AppRegistry } from 'react-native';

import messaging from '@react-native-firebase/messaging';

import { appName } from './app.json';
import { App } from './src/app';
import { addNotificationToStorage } from './src/stores/pushNotification/addNotificationToStorage';

// Push Notification com o app em plano de fundo ou fechado
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    await addNotificationToStorage(remoteMessage)
        .then(() => null)
        .catch((err) => {
            throw new Error(err);
        });

    console.log('Push Notification background message: ', remoteMessage);
});

function HeadlessCheck({ isHeadless }) {
    // App has been launched in the background by iOS, ignore
    return isHeadless ? null : <App />;
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);

import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import dayjs from 'dayjs';

import { storageNotificationName } from '../../config';
import { getStorageJson, setStorage } from '../../services/storage';

export const addNotificationToStorage = async (remoteMessage: FirebaseMessagingTypes.RemoteMessage): Promise<void> => {
    try {
        // Cria um novo objeto com novas propriedades
        const newRemoteMessageObj = { ...remoteMessage, date: dayjs(), notReaded: true };

        // Recebe o storage de notificações
        const notificationStorage = await getStorageJson(storageNotificationName);

        // Verifica se "notificationStorage.data" realmente é um array,
        // Se não for, cria um array vazio
        const dataPushNotification = Array.isArray(notificationStorage?.data) ? notificationStorage.data : [];

        // Cria um novo array para adicionar as novas notificações no início do array
        const newArrayNotificationStorage = dataPushNotification;

        newArrayNotificationStorage.unshift(newRemoteMessageObj);

        setStorage(storageNotificationName, { data: newArrayNotificationStorage })
            .then(() => null)
            .catch((err) => {
                throw new Error(err);
            });
    } catch (error) {
        console.error('Error - Não foi possível adicionar uma nova notificação: ', error);
    }
};

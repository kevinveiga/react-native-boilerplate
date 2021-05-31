import React, { createContext, PropsWithChildren, ReactElement, useCallback, useContext, useEffect, useMemo, useReducer } from 'react';
import { AppState, AppStateStatus, Platform } from 'react-native';

import messaging from '@react-native-firebase/messaging';
import dayjs from 'dayjs';

import { storageNotificationName } from '../Config';
import { getStorageJson, removeStorage, setStorage } from '../Service/Storage';
import { ActionType } from '../Store/Action/ActionType';
import { addNotificationToStorage } from '../Store/PushNotification/AddNotificationToStorage';
import { notificationRedirect } from '../Store/PushNotification/NotificationRedirect';
import { PushNotificationProps, pushNotificationReducer, initialState } from '../Store/Reducer/PushNotification';

interface ActionsProps {
    readed(messageId: string): Promise<void>;
    removed(messageId: string): Promise<void>;
    removedAll(): void;
    updated(): Promise<void>;
}

interface PushNotificationContextProps {
    statePushNotification: PushNotificationProps;
    actions?: ActionsProps | null;
}

const PushNotificationContext = createContext<PushNotificationContextProps>({
    statePushNotification: initialState,
    actions: null
});

export function PushNotificationProvider({ children }: PropsWithChildren<any>): ReactElement {
    // REDUCER
    const [statePushNotification, dispatch] = useReducer(pushNotificationReducer, initialState);

    // ACTION
    const actions = useMemo(() => {
        return {
            initiated: async (): Promise<void> => {
                try {
                    const notificationStorage = await getStorageJson(storageNotificationName);

                    if (Array.isArray(notificationStorage?.data)) {
                        const { data: dataPushNotification } = notificationStorage as PushNotificationProps;

                        // Remove as notificações que tem mais de 1 ano
                        const newDataPushNotification = dataPushNotification?.filter((item) => dayjs().diff(dayjs(item.date), 'year') === 0);

                        dispatch({ payload: newDataPushNotification, type: ActionType.INITIATED });
                    } else {
                        console.log('Sem storage de notificações');
                    }
                } catch (error) {
                    console.error('Error - action.initiated: ', error);
                }
            },
            readed: async (messageId: string | undefined): Promise<void> => {
                try {
                    const notificationStorage = await getStorageJson(storageNotificationName);

                    if (Array.isArray(notificationStorage?.data)) {
                        const { data: dataPushNotification } = notificationStorage as PushNotificationProps;

                        // Procura pelo índice da notificação
                        const index = dataPushNotification?.findIndex((item) => item?.messageId === messageId) || 0;

                        // Verifica se realmente existe o item no array
                        if (dataPushNotification?.[index]) {
                            dataPushNotification[index].notReaded = false;

                            dispatch({
                                payload: dataPushNotification,
                                type: ActionType.READED
                            });
                        } else {
                            console.log('Não existe a notificação');
                        }
                    } else {
                        console.log('Sem storage de notificações');
                    }
                } catch (error) {
                    console.error('Error - action.readed: ', error);
                }
            },
            removed: async (messageId: string): Promise<void> => {
                try {
                    const notificationStorage = await getStorageJson(storageNotificationName);

                    if (Array.isArray(notificationStorage?.data)) {
                        const { data: dataPushNotification } = notificationStorage as PushNotificationProps;

                        const newDataPushNotification = dataPushNotification?.filter((item) => item.messageId !== messageId);

                        dispatch({
                            payload: newDataPushNotification,
                            type: ActionType.REMOVED
                        });
                    } else {
                        console.log('Sem storage de notificações');
                    }
                } catch (error) {
                    console.error('Error - action.removed: ', error);
                }
            },
            removedAll: async (): Promise<void> => {
                try {
                    await removeStorage(storageNotificationName);

                    dispatch({
                        type: ActionType.REMOVED_ALL
                    });
                } catch (error) {
                    console.error('Error - action.removedAll: ', error);
                }
            },
            updated: async (): Promise<void> => {
                try {
                    const notificationStorage = await getStorageJson(storageNotificationName);

                    if (Array.isArray(notificationStorage?.data)) {
                        const { data: dataPushNotification } = notificationStorage as PushNotificationProps;

                        dispatch({ payload: dataPushNotification, type: ActionType.UPDATED });
                    } else {
                        console.log('Sem storage de notificações');
                    }
                } catch (error) {
                    console.error('Error - action.updated: ', error);
                }
            }
        };
    }, []);

    // FUNCTION
    const initState = useCallback(async (): Promise<void> => {
        await actions.initiated();
    }, [actions]);

    const updateState = useCallback(async (): Promise<void> => {
        await actions.updated();
    }, [actions]);

    // EFFECT
    // Ao iniciar o App, verifica se já existe um storage de notificações com o nome "notifications-<mês-atual>-<ano-atual>",
    // então pega o "data" desse storage e faz um dispatch alterando "statePushNotification"
    // caso não exista, cria um novo storage com o nome "notifications-<mês-atual>-<ano-atual>" com o valor "{ data: [] }"
    useEffect(() => {
        initState().catch(() => null);

        // Ao mudar o estado do App, atualiza o state de notificações com os dados do storage
        const handleAppStateChange = (nextAppState: AppStateStatus): void => {
            if (nextAppState === 'active') {
                updateState().catch(() => null);
            }
        };

        AppState.addEventListener('change', handleAppStateChange);

        return (): void => {
            AppState.removeEventListener('change', handleAppStateChange);
        };
    }, [initState, updateState]);

    // Ao alterar o state de notificações, atualiza o storage
    useEffect(() => {
        const { data: dataPushNotification } = statePushNotification;

        // Se o data for diferente de "undefined", grava os dados de notificações no storage
        if (dataPushNotification !== undefined) {
            setStorage(storageNotificationName, statePushNotification)
                .then(() => null)
                .catch((err) => {
                    throw new Error(err);
                });
        }

        return undefined;
    }, [statePushNotification]);

    // FCM
    useEffect(() => {
        // FUNCTION
        // IOS registro de dispositivo
        const registerDevice = async (): Promise<void> => {
            if (Platform.OS === 'ios') {
                await messaging().registerDeviceForRemoteMessages();
                await messaging().setAutoInitEnabled(true);
            }
        };

        registerDevice().catch((err) => {
            throw new Error(err);
        });

        // Pega o token do dispositivo
        const getToken = async (): Promise<void> => {
            await messaging()
                .getToken()
                .then((token) => {
                    if (token) {
                        console.log('Get device token: ', token);
                        // return saveTokenToDatabase(token);
                    } else {
                        console.log('User does not have a device token');
                    }
                })
                .catch((err) => console.error('Get device token rejected: ', err));
        };

        // IOS solicitação de permissão explícitamente
        const requestPermission = async (): Promise<void> => {
            await messaging()
                .requestPermission()
                .then(() => {
                    getToken().catch((err) => {
                        throw new Error(err);
                    });
                })
                .catch((err) => console.error('Request permission rejected: ', err));
        };

        // Verifica permissão
        const hasPermission = async (): Promise<void> => {
            await messaging()
                .hasPermission()
                .then((enabled) => {
                    if (enabled) {
                        getToken().catch((err) => {
                            throw new Error(err);
                        });
                    } else {
                        requestPermission().catch((err) => {
                            throw new Error(err);
                        });
                    }
                })
                .catch((err) => console.error('Permission rejected: ', err));
        };

        hasPermission().catch((err) => {
            throw new Error(err);
        });

        // Ao abrir a Push Notification com o app fechado
        const getInitialNotification = async (): Promise<void> => {
            await messaging()
                .getInitialNotification()
                .then((remoteMessage) => {
                    if (remoteMessage?.messageId) {
                        // Atualiza statePushNotification e marca notReaded como false
                        actions
                            ?.readed(remoteMessage.messageId)
                            .then(() => notificationRedirect(remoteMessage))
                            .catch(() => null);

                        console.log('Push Notification opened app from quit state: ', JSON.stringify(remoteMessage));
                    }
                })
                .catch((err) => {
                    throw new Error(err);
                });
        };

        getInitialNotification().catch((err) => {
            throw new Error(err);
        });

        // LISTENER
        // Push Notification erros
        messaging().onSendError((event) => {
            console.error(event.messageId);
            console.error(event.error);
        });

        // Push Notification com o app aberto (somente retorna o objeto da mensagem, não mostra a Push Notification)
        const onMessage = messaging().onMessage(async (remoteMessage) => {
            await addNotificationToStorage(remoteMessage)
                .then(() => {
                    updateState().catch(() => null);
                })
                .catch((err) => {
                    throw new Error(err);
                });

            console.log('Push Notification foreground message: ', JSON.stringify(remoteMessage));
        });

        // Ao abrir a Push Notification com o app em plano de fundo
        const onNotificationOpenedApp = messaging().onNotificationOpenedApp(async (remoteMessage) => {
            if (remoteMessage.messageId) {
                // Atualiza statePushNotification e marca notReaded como false
                await actions
                    ?.readed(remoteMessage.messageId)
                    .then(() => notificationRedirect(remoteMessage))
                    .catch(() => null);
            }

            console.log('Push Notification opened app from background state: ', JSON.stringify(remoteMessage));
        });

        // Escuta mudanças no token
        const onTokenRefresh = messaging().onTokenRefresh(async (token) => {
            await Promise.resolve(console.log('Change device token: ', token));

            // saveTokenToDatabase(token);
        });

        return (): void => {
            onMessage();
            onNotificationOpenedApp();
            onTokenRefresh();
        };
    }, [actions, updateState]);

    return (
        <PushNotificationContext.Provider
            value={{
                statePushNotification: statePushNotification,
                actions: actions
            }}
        >
            {children}
        </PushNotificationContext.Provider>
    );
}

export function usePushNotification(): PushNotificationContextProps {
    const context = useContext(PushNotificationContext);

    if (context === undefined) {
        throw new Error('usePushNotification can only be used inside PushNotificationProvider');
    }

    return context;
}

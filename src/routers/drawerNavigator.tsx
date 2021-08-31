import React, { ReactElement } from 'react';
import { Linking, StyleSheet, TouchableOpacity, View } from 'react-native';

import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerNavigationOptions } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';

import { useAuth } from '../contexts/auth';
import { usePushNotification } from '../contexts/pushNotification';
import { routes, IRoutes } from './routes';
import { ActionType } from '../stores/action/actionType';

import { ErrorBoundary } from '../components/errorBoundary/errorBoundary';
import { Span } from '../components/text/span';

import MinhaContaClientesLiberta from '../screens/minhaConta/minhaContaClientesLiberta';

import { header } from '../styles/header';
import { variable } from '../styles/variable';

import SvgClose from '../assets/svg/svg-close.svg';
import SvgLogo from '../assets/svg/svg-logo.svg';
import SvgMenu from '../assets/svg/svg-menu.svg';
import SvgMessage from '../assets/svg/svg-message.svg';

const Drawer = createDrawerNavigator();

function MenuDrawerContent({ descriptors, navigation, state, props }: any): ReactElement {
    // STYLE
    const styles = StyleSheet.create({
        btnClose: {
            backgroundColor: variable.colorWhite,
            borderRadius: variable.borderRadius,
            padding: 5,
            position: 'absolute',
            right: 5,
            top: 5,
            zIndex: 3
        }
    });

    // CONTEXT
    const { actions, stateAuth } = useAuth();

    // STATE
    const { status } = stateAuth;

    return (
        <>
            <DrawerContentScrollView {...props}>
                {routes
                    .sort((a, b) => {
                        return (a.order || 0) - (b.order || 0);
                    })
                    .map(({ authRequired = true, routeLabel, showInMenu = true }: IRoutes) => {
                        const { key } = state.routes[state.routes.findIndex((item: any) => item.name === routeLabel)];
                        const { activeTintColor, drawerLabel, inactiveTintColor } = descriptors[key].options;

                        if (!authRequired && showInMenu) {
                            return (
                                <DrawerItem
                                    activeTintColor={activeTintColor || variable.colorPrimary}
                                    focused={state.routes.findIndex((e: any) => e.name === routeLabel) === state.index}
                                    inactiveTintColor={inactiveTintColor || variable.colorSecondary}
                                    key={key}
                                    label={({ color }): ReactElement => <Span color={color}>{drawerLabel}</Span>}
                                    onPress={(): void => navigation.navigate(routeLabel)}
                                />
                            );
                        }

                        if (status === ActionType.LOGGED_IN && authRequired && showInMenu) {
                            return (
                                <DrawerItem
                                    activeTintColor={activeTintColor || variable.colorPrimary}
                                    focused={state.routes.findIndex((e: any) => e.name === routeLabel) === state.index}
                                    inactiveTintColor={inactiveTintColor || variable.colorSecondary}
                                    key={key}
                                    label={({ color }): ReactElement => <Span color={color}>{drawerLabel}</Span>}
                                    onPress={(): void => navigation.navigate(routeLabel)}
                                />
                            );
                        }
                    })}

                <>
                    <DrawerItem
                        inactiveTintColor={variable.colorSecondary}
                        key="nossos-assessores"
                        label={({ color }): ReactElement => <Span color={color}>Nossos Assessores</Span>}
                        onPress={(): Promise<void | null> =>
                            Linking.openURL('https://libertainvestimentos.com.br/assessoria-investimentos.html').catch((err) => {
                                throw new Error(err);
                            })
                        }
                    />

                    <DrawerItem
                        inactiveTintColor={variable.colorSecondary}
                        key="contato"
                        label={({ color }): ReactElement => <Span color={color}>Contato</Span>}
                        onPress={(): Promise<void | null> =>
                            Linking.openURL('https://libertainvestimentos.com.br/').catch((err) => {
                                throw new Error(err);
                            })
                        }
                    />
                </>

                {status === ActionType.LOGGED_IN && (
                    <DrawerItem
                        label="Logout"
                        onPress={(): any => {
                            actions?.logout()?.then(() => {
                                navigation.navigate('Home');
                            });
                        }}
                    />
                )}
            </DrawerContentScrollView>

            <View style={styles.btnClose}>
                <TouchableOpacity onPress={(): any => navigation.dispatch(DrawerActions.closeDrawer())}>
                    <SvgClose height="18px" width="18px" fill={variable.colorSecondary} />
                </TouchableOpacity>
            </View>
        </>
    );
}

export function DrawerNavigator(): ReactElement {
    // VARIABLE
    const messageNumberWrapSize = 15;

    // STYLE
    const styles = StyleSheet.create({
        drawerNavigatorLeft: {
            paddingLeft: variable.padding
        },
        drawerNavigatorRight: {
            paddingRight: variable.padding
        },
        logoWrapper: {
            alignItems: 'center',
            height: '100%',
            width: 150
        },
        messageNumberWarp: {
            alignItems: 'center',
            backgroundColor: variable.colorWhite,
            borderRadius: messageNumberWrapSize,
            height: messageNumberWrapSize,
            justifyContent: 'center',
            position: 'absolute',
            right: -2,
            top: -2,
            width: messageNumberWrapSize
        }
    });

    // CONTEXT
    const { stateAuth } = useAuth();
    const { statePushNotification } = usePushNotification();

    // STATE
    const { data: dataAuth, status } = stateAuth;
    const dataPushNotification = Array.isArray(statePushNotification?.data) ? statePushNotification.data : [];

    return (
        <Drawer.Navigator
            drawerContent={(props): ReactElement => <MenuDrawerContent {...props} />}
            initialRouteName={status === ActionType.LOGGED_IN ? 'Cursos' : 'Home'}
            screenOptions={{ ...header, headerTitleAlign: 'center' }}
        >
            {routes.map(
                ({
                    authRequired = true,
                    component: Component,
                    hasClienteLiberta = false,
                    layout: Layout,
                    routeLabel,
                    showHeader = true
                }: IRoutes) => {
                    return (
                        <Drawer.Screen
                            key={routeLabel}
                            name={routeLabel}
                            options={({ navigation }): DrawerNavigationOptions => ({
                                drawerLabel: routeLabel,
                                headerTitle: (): ReactElement => {
                                    return (
                                        <View style={styles.logoWrapper}>
                                            <SvgLogo height="100%" width="100%" />
                                        </View>
                                    );
                                },
                                headerLeft: (): ReactElement => {
                                    return (
                                        <TouchableOpacity
                                            onPress={(): any => navigation.dispatch(DrawerActions.toggleDrawer())}
                                            style={styles.drawerNavigatorLeft}
                                        >
                                            <SvgMenu height="25px" width="25px" fill={variable.colorSecondary} />
                                        </TouchableOpacity>
                                    );
                                },
                                headerRight: (): ReactElement => {
                                    const messagesNotReaded = dataPushNotification.filter((item) => item.notReaded);

                                    return (
                                        <TouchableOpacity
                                            onPress={(): any => navigation.navigate('Notificações')}
                                            style={styles.drawerNavigatorRight}
                                        >
                                            <SvgMessage height="25px" width="25px" fill={variable.colorSecondary} />

                                            {messagesNotReaded.length > 0 && (
                                                <View style={styles.messageNumberWarp}>
                                                    <Span color={variable.colorRed} bold={true} fontSize={8}>
                                                        {messagesNotReaded.length < 10 ? messagesNotReaded.length : '+9'}
                                                    </Span>
                                                </View>
                                            )}
                                        </TouchableOpacity>
                                    );
                                },
                                headerShown: showHeader
                            })}
                        >
                            {(): ReactElement => (
                                <Layout>
                                    <ErrorBoundary>
                                        {/* Exibe componente que não precisa de autenticação */}
                                        {!authRequired && <Component />}

                                        {/* Se estiver logado, verifica se a rota precisa de autenticação e autorização Cliente Liberta,
                                        verifica se o usuário tem essa autorização Cliente Liberta (dataAuth?.is_cliente_liberta),
                                        caso não tenha, mostra para informações de Cliente Liberta. */}
                                        {status === ActionType.LOGGED_IN &&
                                            authRequired &&
                                            (hasClienteLiberta && dataAuth?.is_cliente_liberta === false ? (
                                                <MinhaContaClientesLiberta />
                                            ) : (
                                                <Component />
                                            ))}
                                    </ErrorBoundary>
                                </Layout>
                            )}
                        </Drawer.Screen>
                    );
                }
            )}
        </Drawer.Navigator>
    );
}

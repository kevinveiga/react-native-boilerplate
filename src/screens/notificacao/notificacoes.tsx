import React, { ReactElement } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

import dayjs from 'dayjs';

import { usePushNotification } from '../../contexts/pushNotification';
import { alertCancelOk } from '../../helpers/alertCancelOk';
import { notificationRedirect } from '../../stores/pushNotification/notificationRedirect';

import { Spacer } from '../../components/layout/spacer';
import { P } from '../../components/text/p';
import { Title2, Title4 } from '../../components/text/title';

import { layout } from '../../styles/layout';
import { list } from '../../styles/list';
import { variable } from '../../styles/variable';

import SvgTrash from '../../assets/svg/svg-trash.svg';

function Notificacoes(): ReactElement {
    // STYLE
    const styles = StyleSheet.create({
        notificacoesList: {
            borderColor: variable.colorGrayLight,
            borderWidth: 1,
            height: 520
        },
        notificacoesListItem: {
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            paddingVertical: 10
        }
    });

    // CONTEXT
    const { statePushNotification, actions } = usePushNotification();

    const dataPushNotification = Array.isArray(statePushNotification?.data) ? statePushNotification.data : [];

    return (
        <View style={layout.container}>
            <Title2>Notificações</Title2>

            <TouchableOpacity
                onPress={(): any => alertCancelOk({ callback: (): any => actions?.removedAll(), title: 'Remover todas as mensagens?' })}
            >
                <P color={variable.colorOrange} textAlign="right" textDecorationLine="underline">
                    Apagar tudo
                </P>
            </TouchableOpacity>

            <Spacer height={15} />

            {dataPushNotification && dataPushNotification.length > 0 ? (
                <View style={styles.notificacoesList}>
                    <FlatList
                        data={dataPushNotification}
                        keyExtractor={(item: any): string => item.messageId}
                        renderItem={({ item, index }: any): ReactElement => {
                            const bgColor = index % 2 ? list.backgroundEven : list.backgroundOdd;
                            const notReadedColor = JSON.parse(item.notReaded.toString()) ? variable.fontColor : variable.colorGray2;

                            return (
                                <View style={{ ...styles.notificacoesListItem, ...bgColor }}>
                                    <View>
                                        <TouchableOpacity
                                            onPress={(): any =>
                                                actions
                                                    ?.readed(item.messageId)
                                                    .then(() => notificationRedirect(item))
                                                    .catch(() => null)
                                            }
                                        >
                                            <Title4 bold={true} color={notReadedColor}>
                                                {item.notification.title}
                                            </Title4>

                                            <P color={notReadedColor}>{item.notification.body}</P>

                                            <P color={notReadedColor}>{dayjs(item.date).format('DD/MM/YYYY HH:mm')}</P>
                                        </TouchableOpacity>
                                    </View>

                                    <View>
                                        <TouchableOpacity
                                            onPress={(): any =>
                                                alertCancelOk({
                                                    callback: (): any => actions?.removed(item.messageId),
                                                    title: 'Remover a mensagem?'
                                                })
                                            }
                                        >
                                            <SvgTrash height="25px" width="25px" fill={variable.colorSecondary} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            );
                        }}
                    />
                </View>
            ) : (
                <>
                    <Spacer height={30} />

                    <P textAlign="center">Sem notificações</P>
                </>
            )}
        </View>
    );
}

export default Notificacoes;

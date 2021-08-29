import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

import { IMessage } from '../../entities/pushNotification';
import { IRouteParams } from '../../entities/routeParams';
import { navigate } from '../../routers/rootNavigation';

export const notificationRedirect = (remoteMessage: FirebaseMessagingTypes.RemoteMessage | IMessage): void => {
    const { id = 0, routeName = null, title = '' } = (remoteMessage.data as IRouteParams) || {};

    if (routeName) {
        navigate(routeName, { id: id, title: title });
    }
};

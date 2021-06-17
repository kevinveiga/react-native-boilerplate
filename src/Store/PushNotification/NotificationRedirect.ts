import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

import { IMessage } from '../../Entity/PushNotification';
import { IRouteParams } from '../../Entity/RouteParams';
import { navigate } from '../../Router/RootNavigation';

export const notificationRedirect = (remoteMessage: FirebaseMessagingTypes.RemoteMessage | IMessage): void => {
    const { id = 0, routeName = null, title = '' } = (remoteMessage.data as IRouteParams) || {};

    if (routeName) {
        navigate(routeName, { id: id, title: title });
    }
};

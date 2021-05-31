import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

import { MessageProps } from '../../Entity/PushNotification';
import { RouteParams } from '../../Entity/RouteParams';
import { navigate } from '../../Router/RootNavigation';

export const notificationRedirect = (remoteMessage: FirebaseMessagingTypes.RemoteMessage | MessageProps): void => {
    const { id = 0, routeName = null, title = '' } = (remoteMessage.data as RouteParams) || {};

    if (routeName) {
        navigate(routeName, { id: id, title: title });
    }
};

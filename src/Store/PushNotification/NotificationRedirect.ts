import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

import { MessageProps } from '../../Entity/PushNotification';
import { navigate } from '../../Router/RootNavigation';

export const NotificationRedirect = (remoteMessage: FirebaseMessagingTypes.RemoteMessage | MessageProps): void => {
    const { data: { id = 0, routeName = null, title = '' } = {} } = remoteMessage || {};

    if (routeName) {
        navigate(routeName as string, { params: { id: id, title: title } });
    }
};

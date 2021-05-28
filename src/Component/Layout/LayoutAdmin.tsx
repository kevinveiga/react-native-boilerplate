import React, { PropsWithChildren, ReactElement } from 'react';
import { View } from 'react-native';

import FooterAdmin from './FooterAdmin';

import { layout } from '../../Style/Layout';

export default function LayoutAdmin({ children }: PropsWithChildren<any>): ReactElement {
    return (
        <View style={layout.mainDefault}>
            <View style={layout.content}>{children}</View>

            <View style={layout.footerAdmin}>
                <FooterAdmin />
            </View>
        </View>
    );
}

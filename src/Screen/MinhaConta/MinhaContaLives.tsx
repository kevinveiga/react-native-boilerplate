import React, { ReactElement } from 'react';
import { View } from 'react-native';

import { Title2 } from '../../Component/Text/Title';

import { layout } from '../../Style/Layout';

export default function MinhaContaLives(): ReactElement {
    return (
        <View style={layout.container}>
            <Title2>Lives</Title2>
        </View>
    );
}

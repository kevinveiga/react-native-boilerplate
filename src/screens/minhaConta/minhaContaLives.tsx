import React, { ReactElement } from 'react';
import { View } from 'react-native';

import { Title2 } from '../../components/text/title';

import { layout } from '../../styles/layout';

export default function MinhaContaLives(): ReactElement {
    return (
        <View style={layout.container}>
            <Title2>Lives</Title2>
        </View>
    );
}

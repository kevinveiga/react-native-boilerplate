import React, { ReactElement } from 'react';
import { View } from 'react-native';

import { Title2 } from '../../components/text/text';

import { layout } from '../../styles/layout';

function MinhaContaLives(): ReactElement {
    return (
        <View style={layout.container}>
            <Title2>Lives</Title2>
        </View>
    );
}

export default MinhaContaLives;

import React, { ReactElement } from 'react';
import { View } from 'react-native';

import { Title2 } from '../../components/text/title';

import { layout } from '../../styles/layout';

function MinhaContaAlmocoGratis(): ReactElement {
    return (
        <View style={layout.container}>
            <Title2>Almoço Grátis</Title2>
        </View>
    );
}

export default MinhaContaAlmocoGratis;

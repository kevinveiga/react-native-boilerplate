import React, { ReactElement } from 'react';
import { View } from 'react-native';

import { Title2 } from '../../components/text/title';

import { layout } from '../../styles/layout';

function MinhaContaCalculadoras(): ReactElement {
    return (
        <View style={layout.container}>
            <Title2>Calculadoras</Title2>
        </View>
    );
}

export default MinhaContaCalculadoras;

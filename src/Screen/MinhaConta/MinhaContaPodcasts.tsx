import React, { ReactElement } from 'react';
import { View } from 'react-native';

import { Title2 } from '../../Component/Text/Title';

import { layout } from '../../Style/Layout';

export default function MinhaContaPodcasts(): ReactElement {
    return (
        <View style={layout.container}>
            <Title2>Podcasts</Title2>
        </View>
    );
}

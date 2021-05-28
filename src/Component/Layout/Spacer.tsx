import React, { ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';

interface SpacerProps {
    height?: number | string;
    width?: number | string;
}

export function Spacer({ height = 10, width = 5 }: SpacerProps): ReactElement {
    const styles = StyleSheet.create({
        size: {
            height: height,
            width: width
        }
    });

    return <View style={styles.size} />;
}

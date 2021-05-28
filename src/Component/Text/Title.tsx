import React, { ReactElement, ReactNode } from 'react';
import { ColorValue, StyleSheet } from 'react-native';

import { Text } from 'react-native-elements';

import { variable } from '../../Style/variable';

interface TitleProps {
    bold?: boolean;
    children?: number | ReactNode | string;
    color?: ColorValue;
    fontSize?: number;
    textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
    textDecorationLine?: 'none' | 'underline' | 'line-through' | 'underline line-through';
}

export function Title1({ bold = true, children, color, fontSize = 30, textAlign, textDecorationLine }: TitleProps): ReactElement {
    const styleObj: { [key: string]: any } = {
        color: color,
        fontFamily: bold ? variable.fontPrimaryBold : variable.fontPrimaryRegular,
        fontSize: fontSize,
        textAlign: textAlign,
        textDecorationLine: textDecorationLine
    };

    // As propriedades com valor null, são removidas do objeto, para pegar o valor default do theme
    const newStyleObj = Object.keys(styleObj).reduce((accumulator: any, key: string) => {
        if (color === null && key === 'color') {
            return accumulator;
        }

        if (fontSize === null && key === 'fontSize') {
            return accumulator;
        }

        accumulator[key] = styleObj[key];

        return accumulator;
    }, {});

    const styles = StyleSheet.create({
        title: newStyleObj
    });

    return <Text style={styles.title}>{children}</Text>;
}

export function Title2({ bold = true, children, color, fontSize = 26, textAlign = 'left' }: TitleProps): ReactElement {
    const styleObj: { [key: string]: any } = {
        color: color,
        fontFamily: bold ? variable.fontPrimaryBold : variable.fontPrimaryRegular,
        fontSize: fontSize,
        textAlign: textAlign
    };

    // As propriedades com valor null, são removidas do objeto, para pegar o valor default do theme
    const newStyleObj = Object.keys(styleObj).reduce((accumulator: any, key: string) => {
        if (color === null && key === 'color') {
            return accumulator;
        }

        if (fontSize === null && key === 'fontSize') {
            return accumulator;
        }

        accumulator[key] = styleObj[key];

        return accumulator;
    }, {});

    const styles = StyleSheet.create({
        title: newStyleObj
    });

    return <Text style={styles.title}>{children}</Text>;
}

export function Title3({ bold = false, children, color, fontSize = 22, textAlign = 'left' }: TitleProps): ReactElement {
    const styleObj: { [key: string]: any } = {
        color: color,
        fontFamily: bold ? variable.fontPrimaryBold : variable.fontPrimaryRegular,
        fontSize: fontSize,
        textAlign: textAlign
    };

    // As propriedades com valor null, são removidas do objeto, para pegar o valor default do theme
    const newStyleObj = Object.keys(styleObj).reduce((accumulator: any, key: string) => {
        if (color === null && key === 'color') {
            return accumulator;
        }

        if (fontSize === null && key === 'fontSize') {
            return accumulator;
        }

        accumulator[key] = styleObj[key];

        return accumulator;
    }, {});

    const styles = StyleSheet.create({
        title: newStyleObj
    });

    return <Text style={styles.title}>{children}</Text>;
}

export function Title4({ bold = false, children, color, fontSize = 18, textAlign = 'left' }: TitleProps): ReactElement {
    const styleObj: { [key: string]: any } = {
        color: color,
        fontFamily: bold ? variable.fontPrimaryBold : variable.fontPrimaryRegular,
        fontSize: fontSize,
        textAlign: textAlign
    };

    // As propriedades com valor null, são removidas do objeto, para pegar o valor default do theme
    const newStyleObj = Object.keys(styleObj).reduce((accumulator: any, key: string) => {
        if (color === null && key === 'color') {
            return accumulator;
        }

        if (fontSize === null && key === 'fontSize') {
            return accumulator;
        }

        accumulator[key] = styleObj[key];

        return accumulator;
    }, {});

    const styles = StyleSheet.create({
        title: newStyleObj
    });

    return <Text style={styles.title}>{children}</Text>;
}

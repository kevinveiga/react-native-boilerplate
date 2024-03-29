import { ComponentProps, ComponentType, ReactElement, ReactNode } from 'react';
import { TextInput, TextInputProps } from 'react-native';

import { IInputStyle } from './styles/form';

export interface IFormLogin {
    email: string;
    password: string;
    passwordConfirm?: string;
}

export interface IInput extends TextInputProps {
    cbFunction?: (value: any) => void;
    maxLength?: number;
    minLength?: number;
    name?: string;
    label?: string;
    leftIcon?: ReactElement;
    rightIcon?: ReactElement;
    theme?: IInputStyle;
}

export interface IInputRadioItems {
    id: string;
    label: string;
    value: string;
}

export interface IInputReference extends TextInput {
    value: string;
}

export interface ILoginPasswordReset {
    email: string;
}

// TODO: usar o React Native Picker Select e modificar essa interface
export interface IPickerSelect extends TextInput {
    cbFunction?: (value: any) => void;
    children?: ReactNode;
    label?: string;
    leftPosition?: string;
    name: string;
    rightPosition?: string;
}

export interface IRoutes {
    authRequired?: boolean;
    component: ComponentType<ComponentProps<any>> | ComponentType<any>;
    layout: ComponentType<ComponentProps<any>> | ComponentType<any>;
    order?: number;
    routeLabel: string;
    showHeader?: boolean;
    showInMenu?: boolean;
}

export interface IVariable {
    [key: string]: string | number;

    // Animations
    duration: string;
    durationFast: string;
    durationSlow: string;
    timing: string;
    timeout1s: string;
    timeout3s: string;
    timeout5s: string;
    transition: string;
    transitionFast: string;
    transitionSlow: string;

    // Color
    colorBlack: string;
    colorBlackTransparent1: string;
    colorBlackTransparent2: string;
    colorBlackTransparent3: string;
    colorBlackTransparent5: string;
    colorBlue: string;
    colorBlueDark: string;
    colorGray: string;
    colorGray2: string;
    colorGray3: string;
    colorGrayDark: string;
    colorGrayDark2: string;
    colorGrayLight: string;
    colorGrayLight2: string;
    colorGrayLight3: string;
    colorGrayLight4: string;
    colorGreen: string;
    colorOrange: string;
    colorPink: string;
    colorRed: string;
    colorWhite: string;
    colorWhiteTransparent1: string;
    colorWhiteTransparent2: string;
    colorWhiteTransparent3: string;
    colorWhiteTransparent5: string;
    colorYellow: string;

    // Color - Msg
    colorAlert: string;
    colorError: string;
    colorInfo: string;
    colorSuccess: string;
    colorWarning: string;

    // Color - App
    colorPrimary: string;
    colorPrimaryHover: string;
    colorSecondary: string;
    colorSecondaryHover: string;

    // Font
    fontColor: string;
    fontPrimary: string;
    fontPrimaryBold: string;
    fontPrimaryExtraBold: string;
    fontPrimaryLight: string;
    fontPrimaryRegular: string;
    fontSize: number;
    letterSpacing: number;
    lineHeight: number;

    // Forms
    allButtons: string;
    allTextInputs: string;
    buttonHeight: number;
    buttonPadding: number;
    buttonPaddingX: number;
    buttonPaddingY: number;
    formBoxShadow: string;
    formBoxShadowFocus: string;
    formBoxShadowError: string;
    inputHeight: number;
    inputMargin: number;
    inputPadding: number;
    inputPaddingX: number;
    inputPaddingY: number;

    // Media Screen
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;

    // Others
    border: string;
    borderColor: string;
    borderRadius: number;
    boxShadowPrimary: string;
    boxShadowSecondary: string;

    // Space
    margin: number;
    padding: number;
    spacingXS: number;
    spacingSM: number;
    spacingMD: number;
    spacingLG: number;
    spacingXL: number;

    // Size
    footerHeight: number;
    headerHeight: number;
}

declare module 'react-native-dropdownalert' {
  import { Component, ReactNode } from 'react';
  import { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';

  export type DropdownAlertType = 'info' | 'warn' | 'error' | 'custom' | 'success';
  export type DropdownAlertAction = 'automatic' | 'programmatic' | 'tap' | 'pan' | 'cancel';

  export interface DropdownAlertCloseParams {
    type: DropdownAlertType;
    title: string;
    message: string;
    action: DropdownAlertAction;
  }

  export interface DropdownAlertProperties {
    closeInterval?: number;
    imageSrc?: string | number;
    startDelta?: number;
    endDelta?: number;
    onClose?: ({  }: DropdownAlertCloseParams) => void;
    cancelBtnImageSrc?: string | number;
    titleNumOfLines?: number;
    messageNumOfLines?: number;
    onCancel?: ({ type }: { type: string }) => void;
    showCancel?: boolean;
    tapToCloseEnabled?: boolean;
    panResponderEnabled?: boolean;
    replaceEnabled?: boolean;
    translucent?: boolean;
    updateStatusBar?: boolean;
    activeStatusBarStyle?: string;
    activeStatusBarBackgroundColor?: string;
    inactiveStatusBarStyle?: string;
    inactiveStatusBarBackgroundColor?: string;
    containerStyle?: StyleProp<ViewStyle>;
    zIndex?: number;
    titleStyle?: StyleProp<TextStyle>;
    messageStyle?: StyleProp<TextStyle>;
    imageStyle?: StyleProp<ImageStyle>;
    cancelBtnImageStyle?: StyleProp<ImageStyle>;
    successColor?: string;
    infoColor?: string;
    warnColor?: string;
    errorColor?: string;
    elevation?: number;
    sensitivity?: number;
    defaultContainer?: StyleProp<ViewStyle>;
    defaultTextContainer?: StyleProp<ViewStyle>;
    useNativeDriver: boolean;
    renderImage?: () => ReactNode;
    renderCancel?: () => ReactNode;
    renderTitle?: () => ReactNode;
    renderMessage?: () => ReactNode;
  }

  export default class DropdownAlert extends Component<DropdownAlertProperties> {
    alertWithType: (type: DropdownAlertType, title: string, message: string) => void;
  }
}

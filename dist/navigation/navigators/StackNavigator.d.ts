import React from 'react';
import { NavigationComponent } from 'react-navigation';
import { createStackNavigator as RNcreateStackNavigator, HeaderBackButtonProps, NavigationStackOptions } from 'react-navigation-stack';
export declare const createStackNavigator: typeof RNcreateStackNavigator;
interface ICustomNavigationParams {
    disableBackButton?: boolean;
    safeAreaColor?: string;
    safeAreaHideTop?: boolean;
    safeAreaHideBottom?: boolean;
}
export declare const StackScreen: {
    setDefaults(defaults: NavigationStackOptions): void;
    withoutHeader(Component: React.ComponentType<any>, options?: NavigationStackOptions & ICustomNavigationParams): NavigationComponent<{}, {}>;
    withDefaultHeader(Component: React.ComponentType<any>, options?: NavigationStackOptions & ICustomNavigationParams): NavigationComponent<{}, {}>;
    BackButton: (props: HeaderBackButtonProps) => JSX.Element;
};
export {};

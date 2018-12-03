import React from 'react';
import { HeaderBackButtonProps, NavigationRouteConfigMap, NavigationStackScreenOptions, StackNavigatorConfig } from 'react-navigation';
export declare const createStackNavigator: (screens: NavigationRouteConfigMap, options?: StackNavigatorConfig) => import("react-navigation").NavigationContainer;
interface ICustomNavigationParams {
    disableBackButton?: boolean;
    safeAreaColor?: string;
    safeAreaHideTop?: boolean;
    safeAreaHideBottom?: boolean;
}
export declare const StackScreen: {
    setDefaults(defaults: NavigationStackScreenOptions): void;
    withoutHeader(Component: React.ComponentType<any>, options?: NavigationStackScreenOptions & ICustomNavigationParams): any;
    withDefaultHeader(Component: React.ComponentType<any>, options?: NavigationStackScreenOptions & ICustomNavigationParams): any;
    BackButton: (props: HeaderBackButtonProps) => JSX.Element;
};
export {};

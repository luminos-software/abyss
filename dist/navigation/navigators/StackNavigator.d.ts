import React from 'react';
import { TextProps } from 'react-native';
import { HeaderBackButtonProps, NavigationRouteConfigMap, OverriddenNavigationStackScreenOptions, StackNavigatorConfig } from 'react-navigation';
declare type HeaderTitleProps = TextProps & {
    title: string;
};
export declare const createStackNavigator: (screens: NavigationRouteConfigMap, options?: StackNavigatorConfig) => import("react-navigation").NavigationContainer;
interface ICustomNavigationParams {
    disableBackButton?: boolean;
    safeAreaColor?: string;
    safeAreaHideTop?: boolean;
    safeAreaHideBottom?: boolean;
}
export declare const StackScreen: {
    setDefaults(defaults: OverriddenNavigationStackScreenOptions): void;
    withoutHeader(Component: React.ComponentType<{}>, options?: OverriddenNavigationStackScreenOptions & ICustomNavigationParams): any;
    withDefaultHeader(Component: React.ComponentType<{}>, options?: OverriddenNavigationStackScreenOptions & ICustomNavigationParams): any;
    BackButton: (props: HeaderBackButtonProps) => JSX.Element;
    connectTitle<State extends {}>(mapStateToProps: (state: State) => HeaderTitleProps): import("react-redux").ConnectedComponentClass<React.StatelessComponent<HeaderTitleProps>, Pick<HeaderTitleProps, never>>;
};
export {};

import R from 'ramda';
import React from 'react';
import { Platform, ViewStyle } from 'react-native';
import {
  createStackNavigator as RNcreateStackNavigator,
  HeaderBackButton,
  HeaderBackButtonProps,
  NavigationComponent,
  NavigationRouteConfigMap,
  NavigationScreenConfig,
  NavigationScreenProp,
  NavigationStackScreenOptions,
  SafeAreaView,
  StackNavigatorConfig
} from 'react-navigation';
import { AndroidBackHandler } from 'react-navigation-backhandler';
import { getMetrics } from '../../theme/metrics';
import { Navigation } from '../service';

// tslint:disable:no-any

const NAV_OPTIONS_DEFAULTS: NavigationScreenConfig<NavigationStackScreenOptions> = {
  gesturesEnabled: false
};

let SCREEN_WITH_HEADER_DEFAULTS: NavigationStackScreenOptions = {
  headerStyle: {
    height: getMetrics().header.height,
    paddingTop: 20
  },
  headerTitleStyle: {
    paddingHorizontal: Platform.select({ ios: 17, android: 0 }),
    color: 'white',
    width: '100%'
  },
  headerTintColor: 'white',
  headerBackTitle: ' '
};

const SCREEN_WITHOUT_HEADER_DEFAULTS: NavigationStackScreenOptions = {
  header: null,
  headerBackTitle: ' '
};

export const createStackNavigator = (screens: NavigationRouteConfigMap, options: StackNavigatorConfig = {}) =>
  RNcreateStackNavigator(screens, {
    navigationOptions: NAV_OPTIONS_DEFAULTS,
    ...options
  });

interface ICustomNavigationParams {
  disableBackButton?: boolean;
  safeAreaColor?: string;
  safeAreaHideTop?: boolean;
  safeAreaHideBottom?: boolean;
}

export const StackScreen = {
  setDefaults(defaults: NavigationStackScreenOptions) {
    SCREEN_WITH_HEADER_DEFAULTS = R.mergeDeepRight(SCREEN_WITH_HEADER_DEFAULTS, defaults);
  },

  withoutHeader(
    Component: React.ComponentType<any>,
    options: NavigationStackScreenOptions & ICustomNavigationParams = {}
  ) {
    const { disableBackButton, safeAreaColor, safeAreaHideTop, safeAreaHideBottom, ...navigationOptions } = options;
    return createStackScreen(
      Component,
      { ...SCREEN_WITHOUT_HEADER_DEFAULTS, ...navigationOptions },
      { disableBackButton, safeAreaColor, safeAreaHideTop, safeAreaHideBottom },
      { paddingTop: safeAreaHideTop ? 0 : Platform.select({ ios: 0, android: 24 }) } // status bar
    );
  },

  withDefaultHeader(
    Component: React.ComponentType<any>,
    options: NavigationStackScreenOptions & ICustomNavigationParams = {}
  ) {
    const { disableBackButton, safeAreaColor, safeAreaHideTop, safeAreaHideBottom, ...navigationOptions } = options;
    return createStackScreen(Component, R.mergeDeepRight(SCREEN_WITH_HEADER_DEFAULTS, navigationOptions), {
      disableBackButton,
      safeAreaColor,
      safeAreaHideTop: true,
      safeAreaHideBottom
    });
  },

  BackButton: (props: HeaderBackButtonProps) => (
    <HeaderBackButton
      title={SCREEN_WITH_HEADER_DEFAULTS.headerBackTitle!}
      tintColor={SCREEN_WITH_HEADER_DEFAULTS.headerTintColor}
      titleStyle={SCREEN_WITH_HEADER_DEFAULTS.headerBackTitleStyle}
      truncatedTitle={SCREEN_WITH_HEADER_DEFAULTS.headerTruncatedBackTitle}
      pressColorAndroid={SCREEN_WITH_HEADER_DEFAULTS.headerPressColorAndroid}
      onPress={Navigation.back}
      {...props}
    />
  )
};

const createStackScreen = (
  Component: React.ComponentType<any>,
  options: NavigationStackScreenOptions = {},
  customOptions: ICustomNavigationParams = {},
  safeAreaStyle: ViewStyle = {}
): NavigationComponent =>
  class extends React.Component<{ navigation: NavigationScreenProp<{}> }> {
    static navigationOptions: NavigationStackScreenOptions = { ...options };

    render() {
      const screen = (
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: customOptions.safeAreaColor || 'white',
            ...safeAreaStyle
          }}
          forceInset={{
            top: customOptions.safeAreaHideTop ? 'never' : 'always',
            bottom: customOptions.safeAreaHideBottom ? 'never' : 'always'
          }}
        >
          <Component navigation={this.props.navigation} />
        </SafeAreaView>
      );

      if (customOptions.disableBackButton) {
        return <AndroidBackHandler onBackPress={() => true}>{screen}</AndroidBackHandler>;
      }
      return screen;
    }
  };

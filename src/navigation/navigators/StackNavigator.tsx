import R from 'ramda';
import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator as RNcreateStackNavigator,
  NavigationComponent,
  NavigationRouteConfigMap,
  NavigationScreenConfig,
  NavigationStackScreenOptions,
  SafeAreaView,
  StackNavigatorConfig
} from 'react-navigation';
import { AndroidBackHandler } from 'react-navigation-backhandler';
import { getMetrics } from '../../theme/metrics';

const NAV_OPTIONS_DEFAULTS: NavigationScreenConfig<NavigationStackScreenOptions> = {
  gesturesEnabled: false
};

let SCREEN_DEFAULTS: NavigationStackScreenOptions = {
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
  headerBackTitle: Platform.select({ ios: 'Back', android: '' })
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
    SCREEN_DEFAULTS = R.mergeDeepRight(SCREEN_DEFAULTS, defaults);
  },

  withoutHeader(Component: React.ComponentType, options: NavigationStackScreenOptions & ICustomNavigationParams = {}) {
    const { disableBackButton, safeAreaColor, safeAreaHideTop, safeAreaHideBottom, ...navigationOptions } = options;
    return createStackScreen(
      Component,
      { ...navigationOptions, header: null },
      { disableBackButton, safeAreaColor, safeAreaHideTop, safeAreaHideBottom }
    );
  },

  withDefaultHeader(
    Component: React.ComponentType,
    options: NavigationStackScreenOptions & ICustomNavigationParams = {}
  ) {
    const { disableBackButton, safeAreaColor, safeAreaHideTop, safeAreaHideBottom, ...navigationOptions } = options;
    return createStackScreen(
      Component,
      {
        ...SCREEN_DEFAULTS,
        ...navigationOptions
      },
      { disableBackButton, safeAreaColor, safeAreaHideTop: true, safeAreaHideBottom }
    );
  }
};

const createStackScreen = (
  Component: React.ComponentType,
  options: NavigationStackScreenOptions = {},
  customOptions: ICustomNavigationParams = {}
): NavigationComponent =>
  class extends React.Component<{}, {}> {
    static navigationOptions: NavigationStackScreenOptions = { ...options };

    render() {
      const screen = (
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: customOptions.safeAreaColor || 'white',
            paddingTop: Platform.select({ ios: 0, android: 20 })
          }}
          forceInset={{
            top: customOptions.safeAreaHideTop ? 'never' : 'always',
            bottom: customOptions.safeAreaHideBottom ? 'never' : 'always'
          }}
        >
          <Component />
        </SafeAreaView>
      );

      if (customOptions.disableBackButton) {
        return <AndroidBackHandler onBackPress={() => true}>{screen}</AndroidBackHandler>;
      }
      return screen;
    }
  };

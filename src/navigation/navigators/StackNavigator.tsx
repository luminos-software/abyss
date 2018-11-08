import R from 'ramda';
import React from 'react';
import { Platform, TextProps, ViewStyle } from 'react-native';
import {
  createStackNavigator as RNcreateStackNavigator,
  HeaderBackButton,
  HeaderBackButtonProps,
  HeaderTitle,
  NavigationComponent,
  NavigationRouteConfigMap,
  NavigationScreenConfig,
  NavigationScreenProp,
  NavigationStackScreenOptions,
  OverriddenNavigationStackScreenOptions,
  SafeAreaView,
  StackNavigatorConfig
} from 'react-navigation';
import { AndroidBackHandler } from 'react-navigation-backhandler';
import { Connect } from 'react-redux';
import { getMetrics } from '../../theme/metrics';
import { Navigation } from '../service';

const getConnect = (): Connect => require('react-redux').connect; // tslint:disable-line:no-require-imports

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

const SCREEN_WITHOUT_HEADER_DEFAULTS: OverriddenNavigationStackScreenOptions = {
  header: null,
  headerBackTitle: ' '
};

type HeaderTitleProps = TextProps & { title: string };
const HeaderTitleView: React.SFC<HeaderTitleProps> = ({ title, ...props }) => (
  <HeaderTitle {...props}>{title}</HeaderTitle>
);

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
  setDefaults(defaults: OverriddenNavigationStackScreenOptions) {
    SCREEN_WITH_HEADER_DEFAULTS = R.mergeDeepRight(SCREEN_WITH_HEADER_DEFAULTS, defaults);
  },

  withoutHeader(
    Component: React.ComponentType<any>,
    options: OverriddenNavigationStackScreenOptions & ICustomNavigationParams = {}
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
    options: OverriddenNavigationStackScreenOptions & ICustomNavigationParams = {}
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
  ),

  connectTitle<State extends {}>(mapStateToProps: (state: State) => HeaderTitleProps) {
    return getConnect()(mapStateToProps)(HeaderTitleView);
  }
};

const createStackScreen = (
  Component: React.ComponentType<any>,
  options: OverriddenNavigationStackScreenOptions = {},
  customOptions: ICustomNavigationParams = {},
  safeAreaStyle: ViewStyle = {}
): NavigationComponent =>
  class extends React.Component<{ navigation: NavigationScreenProp<{}> }> {
    static navigationOptions: OverriddenNavigationStackScreenOptions = { ...options };

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

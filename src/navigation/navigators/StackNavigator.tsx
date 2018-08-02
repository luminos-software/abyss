import R from 'ramda';
import React from 'react';
import { Platform, TextProps } from 'react-native';
import {
  createStackNavigator as RNcreateStackNavigator,
  HeaderBackButton,
  HeaderBackButtonProps,
  HeaderTitle,
  NavigationComponent,
  NavigationRouteConfigMap,
  NavigationScreenConfig,
  NavigationStackScreenOptions,
  OverriddenNavigationStackScreenOptions,
  SafeAreaView,
  StackNavigatorConfig
} from 'react-navigation';
import { AndroidBackHandler } from 'react-navigation-backhandler';
import { connect } from 'react-redux';
import { getMetrics } from '../../theme/metrics';
import { Navigation } from '../service';

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
  headerBackTitle: Platform.select({ ios: 'Back', android: '' })
};

const SCREEN_WITHOUT_HEADER_DEFAULTS: OverriddenNavigationStackScreenOptions = {
  header: null,
  headerBackTitle: Platform.select({ ios: 'Back', android: '' })
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
    Component: React.ComponentType,
    options: OverriddenNavigationStackScreenOptions & ICustomNavigationParams = {}
  ) {
    const { disableBackButton, safeAreaColor, safeAreaHideTop, safeAreaHideBottom, ...navigationOptions } = options;
    return createStackScreen(
      Component,
      { ...SCREEN_WITHOUT_HEADER_DEFAULTS, ...navigationOptions },
      { disableBackButton, safeAreaColor, safeAreaHideTop, safeAreaHideBottom }
    );
  },

  withDefaultHeader(
    Component: React.ComponentType,
    options: OverriddenNavigationStackScreenOptions & ICustomNavigationParams = {}
  ) {
    const { disableBackButton, safeAreaColor, safeAreaHideTop, safeAreaHideBottom, ...navigationOptions } = options;
    return createStackScreen(
      Component,
      {
        ...SCREEN_WITH_HEADER_DEFAULTS,
        ...navigationOptions
      },
      { disableBackButton, safeAreaColor, safeAreaHideTop: true, safeAreaHideBottom }
    );
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

  connectTitle<State extends {}>(mapStateToProps: (state: State) => Partial<HeaderTitleProps>) {
    return connect(mapStateToProps)(HeaderTitleView);
  }
};

const createStackScreen = (
  Component: React.ComponentType,
  options: OverriddenNavigationStackScreenOptions = {},
  customOptions: ICustomNavigationParams = {}
): NavigationComponent =>
  class extends React.Component<{}, {}> {
    static navigationOptions: OverriddenNavigationStackScreenOptions = { ...options };

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

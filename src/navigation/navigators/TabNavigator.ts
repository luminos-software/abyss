import { createBottomTabNavigator, NavigationRouteConfigMap, TabNavigatorConfig } from 'react-navigation';

const defaults: TabNavigatorConfig = {
  swipeEnabled: false,
  animationEnabled: false,
  lazy: true,
  defaultNavigationOptions: {
    tabBarVisible: false
  },
  backBehavior: 'none'
};

export const createTabNavigator = (screens: NavigationRouteConfigMap, options: TabNavigatorConfig = {}) =>
  createBottomTabNavigator(screens, { ...defaults, ...options });

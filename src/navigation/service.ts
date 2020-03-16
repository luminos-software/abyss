import {
  DrawerActions,
  NavigationAction,
  NavigationActions,
  NavigationContainerComponent,
  NavigationNavigateActionPayload,
  NavigationResetActionPayload,
  NavigationRoute,
  NavigationState,
  StackActions
} from 'react-navigation';

let navigator: NavigationContainerComponent | null = null;

const getNavigationScreen = (navState: NavigationState): NavigationRoute => {
  const route = navState.routes[navState.index];

  if (route.index !== undefined) {
    return getNavigationScreen(route);
  }
  return route;
};

const dispatch = (action: NavigationAction) => {
  if (__DEV__) {
    // eslint-disable-next-line
    console.log(`Navigation action: ${action.type} ${(action as any).routeName}`, (action as any).params);
  }
  return (navigator && navigator.dispatch(action)) || false;
};

export const Navigation = {
  setNavigator(navigationContainer: NavigationContainerComponent) {
    navigator = navigationContainer;
  },

  getCurrentScreen(navState?: NavigationState): NavigationRoute | null {
    if (!navState) {
      if (!navigator) {
        return null;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      navState = (navigator.state as any).nav as NavigationState;
    }

    return getNavigationScreen(navState);
  },

  dispatch(action: NavigationAction) {
    return dispatch(action);
  },

  navigate(routeName: string, options?: Partial<NavigationNavigateActionPayload>) {
    return dispatch(NavigationActions.navigate({ routeName, ...options }));
  },

  back() {
    return dispatch(NavigationActions.back({ key: null }));
  },

  reset(options: NavigationResetActionPayload) {
    return dispatch(StackActions.reset(options));
  },

  toggleDrawer() {
    return dispatch(DrawerActions.toggleDrawer());
  },

  openDrawer() {
    return dispatch(DrawerActions.openDrawer());
  },

  closeDrawer() {
    return dispatch(DrawerActions.closeDrawer());
  }
};

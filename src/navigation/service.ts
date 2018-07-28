import {
  DrawerActions,
  NavigationAction,
  NavigationActions,
  NavigationCloseDrawerAction,
  NavigationContainerComponent,
  NavigationNavigateActionPayload,
  NavigationOpenDrawerAction,
  NavigationResetActionPayload,
  NavigationState,
  NavigationToggleDrawerAction,
  StackActions
} from 'react-navigation';

let navigator: NavigationContainerComponent | null = null;

// TODO: fix this
type NavigationActionHack =
  | NavigationAction
  | NavigationToggleDrawerAction
  | NavigationOpenDrawerAction
  | NavigationCloseDrawerAction;

const getNavigationScreen = (navState: NavigationState): string => {
  const route = navState.routes[navState.index];
  if (route.index !== undefined) {
    return getNavigationScreen(route as NavigationState);
  }
  return route.routeName;
};

const dispatch = (action: NavigationActionHack) => {
  if (__DEV__) {
    // tslint:disable-next-line
    console.log(`Navigation action: ${action.type} ${(action as any).routeName}`);
  }
  // TODO: fix this
  // tslint:disable-next-line:no-any
  return (navigator && navigator.dispatch(action as any)) || false;
};

export const Navigation = {
  setNavigator(navigationContainer: NavigationContainerComponent) {
    navigator = navigationContainer;
  },

  getCurrentScreen(navState?: NavigationState) {
    if (!navState) {
      if (!navigator) {
        return null;
      }
      navState = (navigator.state as any).nav as NavigationState; // tslint:disable-line:no-any
    }

    return getNavigationScreen(navState);
  },

  dispatch(action: NavigationActionHack) {
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

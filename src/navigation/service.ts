import {
  NavigationAction,
  NavigationActions,
  NavigationContainerComponent,
  NavigationNavigateActionPayload,
  NavigationResetActionPayload,
  StackActions
} from 'react-navigation';

let navigator: NavigationContainerComponent | null = null;

// tslint:disable-next-line:no-any
const getNavigationScreen = (navState: any): string => {
  const route = navState.routes[navState.index];
  if (route.index !== undefined) {
    return getNavigationScreen(route);
  }
  return route.routeName;
};

const dispatch = (action: NavigationAction) => {
  if (__DEV__) {
    // tslint:disable-next-line
    console.log(`Navigation action: ${action.type} ${(action as any).routeName}`);
  }
  return (navigator && navigator.dispatch(action)) || false;
};

export const Navigation = {
  setNavigator(navigationContainer: NavigationContainerComponent) {
    navigator = navigationContainer;
  },

  getCurrentScreen() {
    if (!navigator) {
      return null;
    }

    return getNavigationScreen((navigator.state as any).nav); // tslint:disable-line:no-any
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
  }
};

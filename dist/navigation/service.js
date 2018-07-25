import { NavigationActions, StackActions } from 'react-navigation';
let navigator = null;
// tslint:disable-next-line:no-any
const getNavigationScreen = (navState) => {
    const route = navState.routes[navState.index];
    if (route.index !== undefined) {
        return getNavigationScreen(route);
    }
    return route.routeName;
};
const dispatch = (action) => {
    if (__DEV__) {
        // tslint:disable-next-line
        console.log(`Navigation action: ${action.type} ${action.routeName}`);
    }
    return (navigator && navigator.dispatch(action)) || false;
};
export const Navigation = {
    setNavigator(navigationContainer) {
        navigator = navigationContainer;
    },
    getCurrentScreen() {
        if (!navigator) {
            return null;
        }
        return getNavigationScreen(navigator.state.nav); // tslint:disable-line:no-any
    },
    dispatch(action) {
        return dispatch(action);
    },
    navigate(routeName, options) {
        return dispatch(NavigationActions.navigate(Object.assign({ routeName }, options)));
    },
    back() {
        return dispatch(NavigationActions.back({ key: null }));
    },
    reset(options) {
        return dispatch(StackActions.reset(options));
    }
};
//# sourceMappingURL=service.js.map
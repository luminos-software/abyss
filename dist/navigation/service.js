"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_navigation_1 = require("react-navigation");
let navigator = null;
const getNavigationScreen = (navState) => {
    const route = navState.routes[navState.index];
    if (route.index !== undefined) {
        return getNavigationScreen(route);
    }
    return route;
};
const dispatch = (action) => {
    if (__DEV__) {
        // eslint-disable-next-line
        console.log(`Navigation action: ${action.type} ${action.routeName}`, action.params);
    }
    return (navigator && navigator.dispatch(action)) || false;
};
exports.Navigation = {
    setNavigator(navigationContainer) {
        navigator = navigationContainer;
    },
    getCurrentScreen(navState) {
        if (!navState) {
            if (!navigator) {
                return null;
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            navState = navigator.state.nav;
        }
        return getNavigationScreen(navState);
    },
    dispatch(action) {
        return dispatch(action);
    },
    navigate(routeName, options) {
        return dispatch(react_navigation_1.NavigationActions.navigate(Object.assign({ routeName }, options)));
    },
    back() {
        return dispatch(react_navigation_1.NavigationActions.back({ key: null }));
    },
    reset(options) {
        return dispatch(react_navigation_1.StackActions.reset(options));
    },
    toggleDrawer() {
        return dispatch(react_navigation_1.DrawerActions.toggleDrawer());
    },
    openDrawer() {
        return dispatch(react_navigation_1.DrawerActions.openDrawer());
    },
    closeDrawer() {
        return dispatch(react_navigation_1.DrawerActions.closeDrawer());
    }
};
//# sourceMappingURL=service.js.map
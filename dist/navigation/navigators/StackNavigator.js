var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import R from 'ramda';
import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator as RNcreateStackNavigator, SafeAreaView } from 'react-navigation';
import { AndroidBackHandler } from 'react-navigation-backhandler';
import { getMetrics } from '../../theme/metrics';
const NAV_OPTIONS_DEFAULTS = {
    gesturesEnabled: false
};
let SCREEN_DEFAULTS = {
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
export const createStackNavigator = (screens, options = {}) => RNcreateStackNavigator(screens, Object.assign({ navigationOptions: NAV_OPTIONS_DEFAULTS }, options));
export const StackScreen = {
    setDefaults(defaults) {
        SCREEN_DEFAULTS = R.mergeDeepRight(SCREEN_DEFAULTS, defaults);
    },
    withoutHeader(Component, options = {}) {
        const { disableBackButton, safeAreaColor, safeAreaHideTop, safeAreaHideBottom } = options, navigationOptions = __rest(options, ["disableBackButton", "safeAreaColor", "safeAreaHideTop", "safeAreaHideBottom"]);
        return createStackScreen(Component, Object.assign({}, navigationOptions, { header: null }), { disableBackButton, safeAreaColor, safeAreaHideTop, safeAreaHideBottom });
    },
    withDefaultHeader(Component, options = {}) {
        const { disableBackButton, safeAreaColor, safeAreaHideTop, safeAreaHideBottom } = options, navigationOptions = __rest(options, ["disableBackButton", "safeAreaColor", "safeAreaHideTop", "safeAreaHideBottom"]);
        return createStackScreen(Component, Object.assign({}, SCREEN_DEFAULTS, navigationOptions), { disableBackButton, safeAreaColor, safeAreaHideTop: true, safeAreaHideBottom });
    }
};
const createStackScreen = (Component, options = {}, customOptions = {}) => { var _a; return _a = class extends React.Component {
        render() {
            const screen = (React.createElement(SafeAreaView, { style: {
                    flex: 1,
                    backgroundColor: customOptions.safeAreaColor || 'white',
                    paddingTop: Platform.select({ ios: 0, android: 20 })
                }, forceInset: {
                    top: customOptions.safeAreaHideTop ? 'never' : 'always',
                    bottom: customOptions.safeAreaHideBottom ? 'never' : 'always'
                } },
                React.createElement(Component, null)));
            if (customOptions.disableBackButton) {
                return React.createElement(AndroidBackHandler, { onBackPress: () => true }, screen);
            }
            return screen;
        }
    },
    _a.navigationOptions = Object.assign({}, options),
    _a; };
//# sourceMappingURL=StackNavigator.js.map
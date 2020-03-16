"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = __importDefault(require("ramda"));
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const react_navigation_1 = require("react-navigation");
const react_navigation_backhandler_1 = require("react-navigation-backhandler");
const react_navigation_stack_1 = require("react-navigation-stack");
const metrics_1 = require("../../theme/metrics");
const service_1 = require("../service");
// tslint:disable:no-any
const NAV_OPTIONS_DEFAULTS = {
    gesturesEnabled: false
};
let SCREEN_WITH_HEADER_DEFAULTS = {
    headerStyle: {
        height: metrics_1.getMetrics().header.height,
        paddingTop: 20
    },
    headerTitleStyle: {
        paddingHorizontal: react_native_1.Platform.select({ ios: 17, android: 0 }),
        color: 'white',
        width: '100%'
    },
    headerTintColor: 'white',
    headerBackTitle: ' '
};
const SCREEN_WITHOUT_HEADER_DEFAULTS = {
    header: null,
    headerBackTitle: ' '
};
exports.createStackNavigator = (screens, options = {}) => react_navigation_stack_1.createStackNavigator(screens, Object.assign({ navigationOptions: NAV_OPTIONS_DEFAULTS }, options));
exports.StackScreen = {
    setDefaults(defaults) {
        SCREEN_WITH_HEADER_DEFAULTS = ramda_1.default.mergeDeepRight(SCREEN_WITH_HEADER_DEFAULTS, defaults);
    },
    withoutHeader(Component, options = {}) {
        const { disableBackButton, safeAreaColor, safeAreaHideTop, safeAreaHideBottom } = options, navigationOptions = __rest(options, ["disableBackButton", "safeAreaColor", "safeAreaHideTop", "safeAreaHideBottom"]);
        return createStackScreen(Component, Object.assign(Object.assign({}, SCREEN_WITHOUT_HEADER_DEFAULTS), navigationOptions), { disableBackButton, safeAreaColor, safeAreaHideTop, safeAreaHideBottom }, { paddingTop: safeAreaHideTop ? 0 : react_native_1.Platform.select({ ios: 0, android: 24 }) } // status bar
        );
    },
    withDefaultHeader(Component, options = {}) {
        const { disableBackButton, safeAreaColor, safeAreaHideTop, safeAreaHideBottom } = options, navigationOptions = __rest(options, ["disableBackButton", "safeAreaColor", "safeAreaHideTop", "safeAreaHideBottom"]);
        return createStackScreen(Component, ramda_1.default.mergeDeepRight(SCREEN_WITH_HEADER_DEFAULTS, navigationOptions), {
            disableBackButton,
            safeAreaColor,
            safeAreaHideTop: true,
            safeAreaHideBottom
        });
    },
    // eslint-disable-next-line react/display-name
    BackButton: (props) => (react_1.default.createElement(react_navigation_stack_1.HeaderBackButton, Object.assign({ title: SCREEN_WITH_HEADER_DEFAULTS.headerBackTitle, tintColor: SCREEN_WITH_HEADER_DEFAULTS.headerTintColor, titleStyle: SCREEN_WITH_HEADER_DEFAULTS.headerBackTitleStyle, truncatedTitle: SCREEN_WITH_HEADER_DEFAULTS.headerTruncatedBackTitle, pressColorAndroid: SCREEN_WITH_HEADER_DEFAULTS.headerPressColorAndroid, onPress: service_1.Navigation.back }, props)))
};
const createStackScreen = (Component, options = {}, customOptions = {}, safeAreaStyle = {}) => { var _a; return _a = class extends react_1.default.Component {
        render() {
            const screen = (react_1.default.createElement(react_navigation_1.SafeAreaView, { style: Object.assign({ flex: 1, backgroundColor: customOptions.safeAreaColor || 'white' }, safeAreaStyle), forceInset: {
                    top: customOptions.safeAreaHideTop ? 'never' : 'always',
                    bottom: customOptions.safeAreaHideBottom ? 'never' : 'always'
                } },
                react_1.default.createElement(Component, { navigation: this.props.navigation })));
            if (customOptions.disableBackButton) {
                return react_1.default.createElement(react_navigation_backhandler_1.AndroidBackHandler, { onBackPress: () => true }, screen);
            }
            return screen;
        }
    },
    _a.navigationOptions = Object.assign({}, options),
    _a.displayName = 'AbyssStackScreen',
    _a; };
//# sourceMappingURL=StackNavigator.js.map
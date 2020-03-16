"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_navigation_1 = require("react-navigation");
const defaults = {
    swipeEnabled: false,
    animationEnabled: false,
    lazy: true,
    defaultNavigationOptions: {
        tabBarVisible: false
    },
    backBehavior: 'none'
};
exports.createTabNavigator = (screens, options = {}) => react_navigation_1.createBottomTabNavigator(screens, Object.assign(Object.assign({}, defaults), options));
//# sourceMappingURL=TabNavigator.js.map
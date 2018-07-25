import { createBottomTabNavigator } from 'react-navigation';
const defaults = {
    swipeEnabled: false,
    animationEnabled: false,
    lazy: true,
    navigationOptions: {
        tabBarVisible: false
    },
    backBehavior: 'none'
};
export const createTabNavigator = (screens, options = {}) => createBottomTabNavigator(screens, Object.assign({}, defaults, options));
//# sourceMappingURL=TabNavigator.js.map
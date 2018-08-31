"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StackNavigator_1 = require("../navigation/navigators/StackNavigator");
const ThemeSelector_1 = require("./ThemeSelector");
exports.DevToolsScreen = StackNavigator_1.StackScreen.withDefaultHeader(ThemeSelector_1.ThemeSelector, {
    headerTitle: 'Dev Tools',
    headerStyle: { backgroundColor: '#d53646' },
    headerTitleStyle: { color: 'white' }
});
//# sourceMappingURL=DevToolsScreen.js.map
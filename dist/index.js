"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
var api_1 = require("./api/api");
exports.Api = api_1.Api;
exports.ApiActions = api_1.ApiActions;
exports.Repository = api_1.Repository;
var jsonapiStore_1 = require("./api/jsonapiStore");
exports.datastore = jsonapiStore_1.datastore;
var config_1 = require("./config");
exports.AbyssConfig = config_1.AbyssConfig;
var DevToolsScreen_1 = require("./devTools/DevToolsScreen");
exports.DevToolsScreen = DevToolsScreen_1.DevToolsScreen;
var StackNavigator_1 = require("./navigation/navigators/StackNavigator");
exports.createStackNavigator = StackNavigator_1.createStackNavigator;
exports.StackScreen = StackNavigator_1.StackScreen;
var TabNavigator_1 = require("./navigation/navigators/TabNavigator");
exports.createTabNavigator = TabNavigator_1.createTabNavigator;
var service_1 = require("./navigation/service");
exports.Navigation = service_1.Navigation;
var createStore_1 = require("./redux/createStore");
exports.createReduxStore = createStore_1.createReduxStore;
var metrics_1 = require("./theme/metrics");
exports.getMetrics = metrics_1.getMetrics;
var ThemeGate_1 = require("./theme/ThemeGate");
exports.ThemeGate = ThemeGate_1.ThemeGate;
var service_2 = require("./transloadit/service");
exports.Transloadit = service_2.Transloadit;
var datastore_1 = require("./util/datastore");
exports.DatastoreUtil = datastore_1.DatastoreUtil;
var email_1 = require("./util/email");
exports.EmailUtil = email_1.EmailUtil;
if (__DEV__) {
    // for rn-debugger
    global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest;
    global.FormData = global.originalFormData || global.FormData;
}
react_native_1.UIManager.setLayoutAnimationEnabledExperimental && react_native_1.UIManager.setLayoutAnimationEnabledExperimental(true);
//# sourceMappingURL=index.js.map
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
var createStore_1 = require("./redux/createStore");
exports.createReduxStore = createStore_1.createReduxStore;
var metrics_1 = require("./theme/metrics");
exports.getMetrics = metrics_1.getMetrics;
var StyleSheet_1 = require("./theme/StyleSheet");
exports.imageStyle = StyleSheet_1.imageStyle;
exports.textStyle = StyleSheet_1.textStyle;
exports.viewStyle = StyleSheet_1.viewStyle;
var ThemeGate_1 = require("./theme/ThemeGate");
exports.ThemeGate = ThemeGate_1.ThemeGate;
var service_1 = require("./transloadit/service");
exports.Transloadit = service_1.Transloadit;
var datastore_1 = require("./util/datastore");
exports.DatastoreUtil = datastore_1.DatastoreUtil;
var email_1 = require("./util/email");
exports.EmailUtil = email_1.EmailUtil;
var licenses_1 = require("./util/licenses");
exports.parseLicenses = licenses_1.parseLicenses;
if (__DEV__) {
    // for rn-debugger
    global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest;
    global.FormData = global.originalFormData || global.FormData;
}
react_native_1.UIManager.setLayoutAnimationEnabledExperimental && react_native_1.UIManager.setLayoutAnimationEnabledExperimental(true);
//# sourceMappingURL=index.js.map
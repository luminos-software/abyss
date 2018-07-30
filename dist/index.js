import { UIManager } from 'react-native';
export { Api, ApiActions, Repository } from './api/api';
export { datastore } from './api/jsonapiStore';
export { AbyssConfig } from './config';
export { createStackNavigator, StackScreen } from './navigation/navigators/StackNavigator';
export { createTabNavigator } from './navigation/navigators/TabNavigator';
export { Navigation } from './navigation/service';
export { createReduxStore } from './redux/createStore';
export { getMetrics } from './theme/metrics';
export { Transloadit } from './transloadit/service';
export { DatastoreUtil } from './util/datastore';
export { EmailUtil } from './util/email';
if (__DEV__) {
    // for rn-debugger
    global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest;
    global.FormData = global.originalFormData || global.FormData;
}
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
//# sourceMappingURL=index.js.map
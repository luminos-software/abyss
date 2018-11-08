import { UIManager } from 'react-native';

export { Api, ApiActions, IApiError, Repository } from './api/api';
export { datastore } from './api/jsonapiStore';
export { AbyssConfig } from './config';
export { DevToolsScreen } from './devTools/DevToolsScreen';
export { createStackNavigator, StackScreen } from './navigation/navigators/StackNavigator';
export { createTabNavigator } from './navigation/navigators/TabNavigator';
export { Navigation } from './navigation/service';
export { createReduxStore } from './redux/createStore';
export { State as OfflineState } from './redux/offlineReducer';
export { getMetrics } from './theme/metrics';
export { ThemeGate } from './theme/ThemeGate';
export { Transloadit } from './transloadit/service';
export { DatastoreUtil } from './util/datastore';
export { EmailUtil } from './util/email';
export { Arguments, InferFromAxiosReturnType } from './util/types';

if (__DEV__) {
  // for rn-debugger
  global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest;
  global.FormData = global.originalFormData || global.FormData;
}

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

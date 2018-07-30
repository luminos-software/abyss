import '@redux-offline/redux-offline';
import { UIManager } from 'react-native';
import * as epics from './redux/offlineEpics';

export { Api, ApiActions, IApiError, Repository } from './api/api';
export { datastore } from './api/jsonapiStore';
export { AbyssConfig } from './config';
export { createStackNavigator, StackScreen } from './navigation/navigators/StackNavigator';
export { createTabNavigator } from './navigation/navigators/TabNavigator';
export { Navigation } from './navigation/service';
export { apiMiddleware } from './redux/apiMiddleware';
export { offlineConfig as defaultOfflineConfig } from './redux/offline';
export { reducer as offlineReducer, State as OfflineState } from './redux/offlineReducer';
export { getMetrics } from './theme/metrics';
export { transloaditMiddleware } from './transloadit/middleware';
export { Transloadit } from './transloadit/service';
export { DatastoreUtil } from './util/datastore';
export { Arguments, InferFromAxiosReturnType } from './util/types';

export const offlineEpics = epics;

if (__DEV__) {
  // for rn-debugger
  global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest;
  global.FormData = global.originalFormData || global.FormData;
}

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

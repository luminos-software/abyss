import { UIManager } from 'react-native';

export { Api, ApiActions, ApiError, Repository } from './api/api';
export { datastore } from './api/jsonapiStore';
export { AbyssConfig } from './config';
export { createReduxStore } from './redux/createStore';
export { getMetrics } from './theme/metrics';
export { imageStyle, textStyle, viewStyle } from './theme/StyleSheet';
export { ThemeGate } from './theme/ThemeGate';
export { Transloadit } from './transloadit/service';
export { DatastoreUtil } from './util/datastore';
export { EmailUtil } from './util/email';
export { parseLicenses } from './util/licenses';
export { Arguments, InferFromAxiosReturnType } from './util/types';

if (__DEV__) {
  // for rn-debugger
  global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest;
  global.FormData = global.originalFormData || global.FormData;
}

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

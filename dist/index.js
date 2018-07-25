import '@redux-offline/redux-offline';
import { UIManager } from 'react-native';
import * as epics from './redux/offlineEpics';
export { Api, ApiActions, Repository } from './api/api';
export { AbyssConfig } from './config';
export { apiMiddleware } from './redux/apiMiddleware';
export { offlineConfig as defaultOfflineConfig } from './redux/offline';
export { reducer as offlineReducer } from './redux/offlineReducer';
export { getMetrics } from './theme/metrics';
export const offlineEpics = epics;
if (__DEV__) {
    // for rn-debugger
    global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest;
    global.FormData = global.originalFormData || global.FormData;
}
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
//# sourceMappingURL=index.js.map
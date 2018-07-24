import '@redux-offline/redux-offline';
export { Api, ApiActions, Repository } from 'api/api';
export { ReduxUtil } from './redux/util';
export const AbyssConfig = {
    api: {
        serverUrl: '',
        prefix: '/api/v1',
        timeout: 4000
    },
    redux: {
        reducerVersion: '0',
        blacklist: ['volatile'],
        offlineCalls: {}
    }
};
//# sourceMappingURL=index.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbyssConfig = {
    api: {
        serverUrl: '',
        prefix: '/api/v1',
        timeout: 4000,
        offlineCalls: {},
        authCalls: []
    },
    redux: {
        reducerVersion: '0'
    },
    transloadit: {
        key: '',
        secret: '',
        notifiyUrl: 'https://localhost/transloadit/file_upload',
        templates: {},
        progressAction: null
    },
    theme: { colors: {} }
};
//# sourceMappingURL=config.js.map
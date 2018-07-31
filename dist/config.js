"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:no-object-literal-type-assertion
exports.AbyssConfig = {
    api: {
        serverUrl: '',
        prefix: '/api/v1',
        timeout: 4000,
        // tslint:disable-next-line:no-any
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
    }
};
//# sourceMappingURL=config.js.map
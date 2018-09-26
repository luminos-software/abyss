"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jshashes_1 = __importDefault(require("jshashes"));
const moment_1 = __importDefault(require("moment"));
const api_1 = require("../api/api");
const config_1 = require("../config");
const API_URL = 'https://api2.transloadit.com';
const fetchBlob = () => require('rn-fetch-blob'); // tslint:disable-line:no-require-imports
const generateParams = (template) => {
    const expiresAt = moment_1.default()
        .add(3, 'hours')
        .utc();
    return {
        auth: {
            key: config_1.AbyssConfig.transloadit.key,
            expires: expiresAt.format('YYYY/MM/DD HH:mm:ss+00:00')
        },
        template_id: template,
        notify_url: config_1.AbyssConfig.transloadit.notifiyUrl
    };
};
const sign = (data) => new jshashes_1.default.SHA1().hex_hmac(config_1.AbyssConfig.transloadit.secret, data);
exports.Transloadit = {
    action(uri, template, asyncAction, extraParams = {}) {
        return {
            type: 'transloadit/UPLOAD_FILE',
            meta: {
                offline: {
                    effect: {
                        fileUri: uri,
                        template,
                        extraParams
                    },
                    commit: { type: asyncAction.done.type },
                    rollback: { type: asyncAction.failed.type }
                }
            }
        };
    }
};
let store = null;
exports.setTransloaditReduxStore = (newStore) => (store = newStore);
exports.uploadFile = ({ fileUri, template, extraParams }) => {
    const params = JSON.stringify(generateParams(config_1.AbyssConfig.transloadit.templates[template]));
    const signature = sign(params);
    const extraFetchParams = Object.keys(extraParams || {}).map(key => ({ name: key, data: extraParams[key] }));
    return fetchBlob()
        .fetch('POST', `${API_URL}/assemblies`, { 'Content-Type': 'multipart/form-data' }, [
        { name: 'params', data: params },
        { name: 'signature', data: signature },
        { name: 'file', filename: 'file', data: fetchBlob().wrap(fileUri) },
        { name: 'auth_token', data: api_1.Api.getAuthToken() }
    ].concat(extraFetchParams))
        .uploadProgress((written, total) => dispatch(fileUri, written, total))
        .then(() => dispatch(fileUri, 1, 1));
};
const dispatch = (file, written, total) => config_1.AbyssConfig.transloadit.progressAction &&
    store &&
    store.dispatch(config_1.AbyssConfig.transloadit.progressAction({ file, written, total }));
//# sourceMappingURL=service.js.map
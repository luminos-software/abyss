import Hashes from 'jshashes';
import moment from 'moment';
import FetchBlob from 'react-native-fetch-blob';
import { Api } from '../api/api';
import { AbyssConfig } from '../config';
import { store } from '../redux/createStore';
const API_URL = 'https://api2.transloadit.com';
const generateParams = (template) => {
    const expiresAt = moment()
        .add(3, 'hours')
        .utc();
    return {
        auth: {
            key: AbyssConfig.transloadit.key,
            expires: expiresAt.format('YYYY/MM/DD HH:mm:ss+00:00')
        },
        template_id: template,
        notify_url: AbyssConfig.transloadit.notifiyUrl
    };
};
const sign = (data) => new Hashes.SHA1().hex_hmac(AbyssConfig.transloadit.secret, data);
export const Transloadit = {
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
    },
    uploadFile({ fileUri, template, extraParams }) {
        const params = JSON.stringify(generateParams(AbyssConfig.transloadit.templates[template]));
        const signature = sign(params);
        const extraFetchParams = Object.keys(extraParams || {}).map(key => ({ name: key, data: extraParams[key] }));
        return FetchBlob.fetch('POST', `${API_URL}/assemblies`, { 'Content-Type': 'multipart/form-data' }, [
            { name: 'params', data: params },
            { name: 'signature', data: signature },
            { name: 'file', filename: 'file', data: FetchBlob.wrap(fileUri) },
            { name: 'auth_token', data: Api.getAuthToken() }
        ].concat(extraFetchParams))
            .uploadProgress((written, total) => dispatch(fileUri, written, total))
            .then(() => dispatch(fileUri, 1, 1));
    }
};
const dispatch = (file, written, total) => AbyssConfig.transloadit.progressAction &&
    store &&
    store.dispatch(AbyssConfig.transloadit.progressAction({ file, written, total }));
//# sourceMappingURL=service.js.map
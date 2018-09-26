import Hashes from 'jshashes';
import moment from 'moment';
import { Store } from 'redux';
import FetchBlob from 'rn-fetch-blob';
import { AsyncActionCreators } from 'typescript-fsa';
import { Api } from '../api/api';
import { AbyssConfig } from '../config';

const API_URL = 'https://api2.transloadit.com';

const fetchBlob = (): FetchBlob => require('rn-fetch-blob'); // tslint:disable-line:no-require-imports

const generateParams = (template: string) => {
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

const sign = (data: string) => new Hashes.SHA1().hex_hmac(AbyssConfig.transloadit.secret, data);

export const Transloadit = {
  action<P, S, E>(
    uri: string,
    template: string,
    asyncAction: AsyncActionCreators<P, S, E>,
    extraParams: Record<string, string> = {}
  ) {
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

let store: Store | null = null;

export const setTransloaditReduxStore = (newStore: Store) => (store = newStore);

export const uploadFile = ({
  fileUri,
  template,
  extraParams
}: {
  fileUri: string;
  template: string;
  extraParams: Record<string, string>;
}) => {
  const params = JSON.stringify(generateParams(AbyssConfig.transloadit.templates[template]));
  const signature = sign(params);

  const extraFetchParams = Object.keys(extraParams || {}).map(key => ({ name: key, data: extraParams[key] }));

  return fetchBlob()
    .fetch(
      'POST',
      `${API_URL}/assemblies`,
      { 'Content-Type': 'multipart/form-data' },
      [
        { name: 'params', data: params },
        { name: 'signature', data: signature },
        { name: 'file', filename: 'file', data: fetchBlob().wrap(fileUri) },
        { name: 'auth_token', data: Api.getAuthToken() }
      ].concat(extraFetchParams)
    )
    .uploadProgress((written, total) => dispatch(fileUri, written, total))
    .then(() => dispatch(fileUri, 1, 1));
};

const dispatch = (file: string, written: number, total: number) =>
  AbyssConfig.transloadit.progressAction &&
  store &&
  store.dispatch(AbyssConfig.transloadit.progressAction({ file, written, total }));

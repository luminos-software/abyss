// tslint:disable:no-any
import { datastore } from 'api/jsonapiStore';
import { JsonApiDataStoreModel } from 'jsonapi-datastore';
import R from 'ramda';
import { createTransform } from 'redux-persist';

const DATASTORE_TYPE = 'JSONAPI_DATASTORE';
const DATASTORE_ARRAY_TYPE = 'JSONAPI_DATASTORE_ARRAY';

interface IStoredModel {
  type: typeof DATASTORE_TYPE;
  data: {};
}

interface IStoredModelArray {
  type: typeof DATASTORE_ARRAY_TYPE;
  data: Array<{}>;
}

export const jsonapiDatastorePersistence = createTransform(
  // transform state coming from redux on its way to being serialized and stored
  (inboundState: {}, key: string) => serialize(inboundState, key),
  // transform state coming from storage, on its way to be rehydrated into redux
  (outboundState: {}, key: string) => deserialize(outboundState, key)
);

const serialize = (state: any, key: string): any => {
  if (key !== 'data') {
    return state;
  }

  return R.map(object => {
    if (object instanceof JsonApiDataStoreModel) {
      return { type: DATASTORE_TYPE, data: object.serialize() };
    }
    if (isJsonApiDataStoreModelArray(object)) {
      return { type: DATASTORE_ARRAY_TYPE, data: object.map(store => store.serialize()) };
    }
    return object;
  }, state);
};

const deserialize = (state: any, key: string): any => {
  if (key !== 'data' || !state || typeof state !== 'object') {
    return state;
  }

  return R.map(object => {
    if (isStoredModel(object)) {
      return datastore.sync(object.data);
    }
    if (isStoredModelArray(object)) {
      return object.data.map((element: {}) => datastore.sync(element));
    }
    return object;
  }, state);
};

const isStoredModel = (object: any): object is IStoredModel =>
  object && typeof object === 'object' && object.type === DATASTORE_TYPE;
const isStoredModelArray = (object: any): object is IStoredModelArray =>
  object && typeof object === 'object' && object.type === DATASTORE_ARRAY_TYPE;
const isJsonApiDataStoreModelArray = (object: any): object is JsonApiDataStoreModel[] =>
  object instanceof Array && object[0] instanceof JsonApiDataStoreModel;

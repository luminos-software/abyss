/* eslint-disable @typescript-eslint/no-explicit-any */
import { datastore, JsonApiDataStoreModel } from '../api/jsonapiStore';

const DATASTORE_TYPE = 'JSONAPI_DATASTORE';
const DATASTORE_ARRAY_TYPE = 'JSONAPI_DATASTORE_ARRAY';

export const serializeValue = (object: any) => {
  const result: any = {};
  for (const key in object) {
    if (object[key] instanceof JsonApiDataStoreModel) {
      result[key] = { type: DATASTORE_TYPE, data: object[key].serialize() };
    } else if (isJsonApiDataStoreModelArray(object[key])) {
      result[key] = { type: DATASTORE_ARRAY_TYPE, data: object[key].map((s: any) => s.serialize()) };
    } else {
      result[key] = object[key];
    }
  }
  return result;
};

export const deserializeValue = (object: any) => {
  const result: any = {};
  for (const key in object) {
    if (isStoredModel(object[key])) {
      result[key] = datastore.sync(object[key].data);
    } else if (isStoredModelArray(object[key])) {
      result[key] = object[key].data.map((element: any) => datastore.sync(element));
    } else {
      result[key] = object[key];
    }
  }
  return result;
};

interface IStoredModel {
  type: typeof DATASTORE_TYPE;
  data: {};
}

interface IStoredModelArray {
  type: typeof DATASTORE_ARRAY_TYPE;
  data: Array<{}>;
}

const isStoredModel = (object: any): object is IStoredModel =>
  object && typeof object === 'object' && object.type === DATASTORE_TYPE;
const isStoredModelArray = (object: any): object is IStoredModelArray =>
  object && typeof object === 'object' && object.type === DATASTORE_ARRAY_TYPE;
const isJsonApiDataStoreModelArray = (object: any): object is JsonApiDataStoreModel[] =>
  object instanceof Array && object[0] instanceof JsonApiDataStoreModel;

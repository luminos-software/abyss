import { JsonApiDataStoreModel } from 'jsonapi-datastore';
import { datastore } from '../api/jsonapiStore';

function cloneModel<T>(model: T): T {
  if (!(model instanceof JsonApiDataStoreModel)) {
    return model;
  }
  const serialized = model.serialize();
  datastore.destroy(model);
  // tslint:disable-next-line:no-any
  return (datastore.sync(serialized) as any) as T;
}

export const DatastoreUtil = { cloneModel };

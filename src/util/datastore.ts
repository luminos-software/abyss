import { datastore, JsonApiDataStoreModel } from '../api/jsonapiStore';

const cloneModel = <T>(model: T): T => {
  if (!(model instanceof JsonApiDataStoreModel)) {
    return model;
  }
  const serialized = model.serialize();
  datastore.destroy(model);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (datastore.sync(serialized) as any) as T;
};

export const DatastoreUtil = { cloneModel };

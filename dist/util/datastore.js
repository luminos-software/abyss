import { JsonApiDataStoreModel } from 'jsonapi-datastore';
import { datastore } from '../api/jsonapiStore';
function cloneModel(model) {
    if (!(model instanceof JsonApiDataStoreModel)) {
        return model;
    }
    const serialized = model.serialize();
    datastore.destroy(model);
    // tslint:disable-next-line:no-any
    return datastore.sync(serialized);
}
export const DatastoreUtil = { cloneModel };
//# sourceMappingURL=datastore.js.map
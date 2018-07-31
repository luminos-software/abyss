"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonapi_datastore_1 = require("jsonapi-datastore");
const jsonapiStore_1 = require("../api/jsonapiStore");
function cloneModel(model) {
    if (!(model instanceof jsonapi_datastore_1.JsonApiDataStoreModel)) {
        return model;
    }
    const serialized = model.serialize();
    jsonapiStore_1.datastore.destroy(model);
    // tslint:disable-next-line:no-any
    return jsonapiStore_1.datastore.sync(serialized);
}
exports.DatastoreUtil = { cloneModel };
//# sourceMappingURL=datastore.js.map
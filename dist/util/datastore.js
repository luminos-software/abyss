"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonapiStore_1 = require("../api/jsonapiStore");
const cloneModel = (model) => {
    if (!(model instanceof jsonapiStore_1.JsonApiDataStoreModel)) {
        return model;
    }
    const serialized = model.serialize();
    jsonapiStore_1.datastore.destroy(model);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return jsonapiStore_1.datastore.sync(serialized);
};
exports.DatastoreUtil = { cloneModel };
//# sourceMappingURL=datastore.js.map
"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
const relationshipIdentifier = (model) => ({ type: model._type, id: model.id });
class JsonApiDataStoreModel {
    constructor(type, id) {
        /**
         * Serialize a model.
         * @param {object} opts The options for serialization.  Available properties:
         *
         *  - `{array=}` `attributes` The list of attributes to be serialized (default: all attributes).
         *  - `{array=}` `relationships` The list of relationships to be serialized (default: all relationships).
         * @return {object} JSONAPI-compliant object
         */
        this.serialize = (opts = {}) => {
            const res = { data: { type: this._type, id: this.id } };
            opts.attributes = opts.attributes || this._attributes;
            opts.relationships = opts.relationships || this._relationships;
            // if (this.id !== undefined) {
            //   res.data.id = this.id;
            // }
            if (opts.attributes.length !== 0) {
                res.data.attributes = {};
            }
            if (opts.relationships.length !== 0) {
                res.data.relationships = {};
            }
            opts.attributes.forEach(key => (res.data.attributes[key] = this[key]));
            opts.relationships.forEach(key => {
                if (!this[key]) {
                    res.data.relationships[key] = { data: null };
                }
                else if (this[key].constructor === Array) {
                    res.data.relationships[key] = {
                        data: this[key].map(relationshipIdentifier)
                    };
                }
                else {
                    res.data.relationships[key] = {
                        data: relationshipIdentifier(this[key])
                    };
                }
            });
            return res;
        };
        this.clone = () => {
            const clone = new JsonApiDataStoreModel(this._type, this.id);
            clone._attributes = [...this._attributes];
            clone._relationships = [...this._relationships];
            this._attributes.forEach(key => (clone[key] = this[key]));
            this._relationships.forEach(key => (clone[key] = this[key]));
            return clone;
        };
        /**
         * Set/add an attribute to a model.
         * @method setAttribute
         * @param {string} attrName The name of the attribute.
         * @param {object} value The value of the attribute.
         */
        this.setAttribute = (attrName, value) => {
            if (!(attrName in this)) {
                this._attributes.push(attrName);
            }
            this[attrName] = value;
        };
        /**
         * Set/add a relationships to a model.
         * @method setRelationship
         * @param {string} relName The name of the relationship.
         * @param {object} models The linked model(s).
         */
        this.setRelationship = (relName, models) => {
            if (!(relName in this)) {
                this._relationships.push(relName);
            }
            this[relName] = models;
        };
        this.id = id;
        this._type = type;
        this._attributes = [];
        this._relationships = [];
    }
}
exports.JsonApiDataStoreModel = JsonApiDataStoreModel;
class JsonApiDataStore {
    constructor() {
        this.graph = {};
        /**
         * Remove a model from the store.
         * @method destroy
         * @param {object} model The model to destroy.
         */
        this.destroy = (model) => {
            delete this.graph[model._type][model.id];
        };
        /**
         * Retrieve a model by type and id. Constant-time lookup.
         * @method find
         * @param {string} type The type of the model.
         * @param {string} id The id of the model.
         * @return {object} The corresponding model if present, and null otherwise.
         */
        this.find = (type, id) => {
            if (!this.graph[type] || !this.graph[type][id]) {
                return null;
            }
            return this.graph[type][id];
        };
        /**
         * Retrieve all models by type.
         * @param {string} type The type of the model.
         * @return {object} Array of the corresponding model if present, and empty array otherwise.
         */
        this.findAll = (type) => {
            if (!this.graph[type]) {
                return [];
            }
            return Object.keys(this.graph[type]).map(id => this.graph[type][id]);
        };
        /**
         * Empty the store.
         */
        this.reset = () => {
            this.graph = {};
        };
        this.cloneModel = (model) => {
            const clone = model.clone();
            this.graph[model._type][model.id] = clone;
            return clone;
        };
        this.initModel = (type, id) => {
            this.graph[type] = this.graph[type] || {};
            this.graph[type][id] = this.graph[type][id] ? this.graph[type][id] : new JsonApiDataStoreModel(type, id);
            return this.graph[type][id];
        };
        this.findOrInit = (resource) => {
            if (!this.find(resource.type, resource.id)) {
                this.initModel(resource.type, resource.id);
            }
            return this.graph[resource.type][resource.id];
        };
        this.syncRecord = (record) => {
            const model = this.initModel(record.type, record.id);
            for (const key in record.attributes) {
                if (!model._attributes.includes(key)) {
                    model._attributes.push(key);
                }
                model[key] = record.attributes[key];
            }
            if (record.relationships) {
                for (const key in record.relationships) {
                    const rel = record.relationships[key];
                    if (rel.data !== undefined) {
                        model._relationships.push(key);
                        if (rel.data === null) {
                            model[key] = null;
                        }
                        else if (rel.data.constructor === Array) {
                            model[key] = rel.data.map(this.findOrInit);
                        }
                        else {
                            model[key] = this.findOrInit(rel.data);
                        }
                    }
                    if (rel.links) {
                        // eslint-disable-next-line no-console
                        console.warn('Links not implemented yet.');
                    }
                }
            }
            // we could be smarter here (only create a new object if fields have changed)
            return this.cloneModel(model);
        };
        /**
         * Sync a JSONAPI-compliant payload with the store and return any metadata included in the payload
         * @param {object} data The JSONAPI payload
         * @return {object} The model/array of models corresponding to the payload's primary resource(s) and any metadata.
         */
        this.syncWithMeta = (payload) => {
            const primary = payload.data;
            if (!primary) {
                throw new Error('Invalid JSONAPI document');
            }
            if (payload.included) {
                payload.included.map(this.syncRecord);
            }
            return {
                data: Array.isArray(primary) ? primary.map(this.syncRecord) : this.syncRecord(primary),
                meta: 'meta' in payload ? payload.meta : null
            };
        };
        /**
         * Sync a JSONAPI-compliant payload with the store.
         * @param {object} data The JSONAPI payload
         * @return {object} The model/array of models corresponding to the payload's primary resource(s).
         */
        this.sync = (payload) => {
            return this.syncWithMeta(payload).data;
        };
    }
}
exports.datastore = new JsonApiDataStore();
//# sourceMappingURL=jsonapiStore.js.map
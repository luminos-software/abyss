interface JSONAPIData {
    type: string;
    id: string;
    attributes?: Record<string, any>;
    relationships?: Record<string, any>;
}
interface JSONAPIObject {
    data: JSONAPIData;
    included?: JSONAPIData[];
    meta?: any;
}
interface JSONAPIObjectArray {
    data: JSONAPIData[];
    included?: JSONAPIData[];
    meta?: any;
}
export declare class JsonApiDataStoreModel implements Record<string, object> {
    id: string;
    _type: string;
    _attributes: string[];
    _relationships: string[];
    constructor(type: string, id: string);
    /**
     * Serialize a model.
     * @param {object} opts The options for serialization.  Available properties:
     *
     *  - `{array=}` `attributes` The list of attributes to be serialized (default: all attributes).
     *  - `{array=}` `relationships` The list of relationships to be serialized (default: all relationships).
     * @return {object} JSONAPI-compliant object
     */
    serialize: (opts?: {
        attributes?: string[] | undefined;
        relationships?: string[] | undefined;
    }) => JSONAPIObject;
    clone: () => JsonApiDataStoreModel;
    /**
     * Set/add an attribute to a model.
     * @method setAttribute
     * @param {string} attrName The name of the attribute.
     * @param {object} value The value of the attribute.
     */
    setAttribute: (attrName: string, value: any) => void;
    /**
     * Set/add a relationships to a model.
     * @method setRelationship
     * @param {string} relName The name of the relationship.
     * @param {object} models The linked model(s).
     */
    setRelationship: (relName: string, models: JsonApiDataStoreModel[]) => void;
    [key: string]: any;
}
declare class JsonApiDataStore {
    graph: Record<string, Record<string, JsonApiDataStoreModel>>;
    /**
     * Remove a model from the store.
     * @method destroy
     * @param {object} model The model to destroy.
     */
    destroy: (model: JsonApiDataStoreModel) => void;
    /**
     * Retrieve a model by type and id. Constant-time lookup.
     * @method find
     * @param {string} type The type of the model.
     * @param {string} id The id of the model.
     * @return {object} The corresponding model if present, and null otherwise.
     */
    find: <T>(type: string, id: string) => T | null;
    /**
     * Retrieve all models by type.
     * @param {string} type The type of the model.
     * @return {object} Array of the corresponding model if present, and empty array otherwise.
     */
    findAll: <T>(type: string) => T[];
    /**
     * Empty the store.
     */
    reset: () => void;
    cloneModel: (model: JsonApiDataStoreModel) => JsonApiDataStoreModel;
    initModel: (type: string, id: string) => JsonApiDataStoreModel;
    findOrInit: (resource: JSONAPIData) => JsonApiDataStoreModel;
    syncRecord: (record: JSONAPIData) => JsonApiDataStoreModel;
    /**
     * Sync a JSONAPI-compliant payload with the store and return any metadata included in the payload
     * @param {object} data The JSONAPI payload
     * @return {object} The model/array of models corresponding to the payload's primary resource(s) and any metadata.
     */
    syncWithMeta: (payload: JSONAPIObject | JSONAPIObjectArray) => {
        data: JsonApiDataStoreModel | JsonApiDataStoreModel[];
        meta: any;
    };
    /**
     * Sync a JSONAPI-compliant payload with the store.
     * @param {object} data The JSONAPI payload
     * @return {object} The model/array of models corresponding to the payload's primary resource(s).
     */
    sync: (payload: JSONAPIObject | JSONAPIObjectArray) => JsonApiDataStoreModel | JsonApiDataStoreModel[];
}
export declare const datastore: JsonApiDataStore;
export {};

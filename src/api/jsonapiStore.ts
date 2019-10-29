/* eslint-disable @typescript-eslint/no-explicit-any */

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

const relationshipIdentifier = (model: JsonApiDataStoreModel) => ({ type: model._type, id: model.id });

export class JsonApiDataStoreModel implements Record<string, object> {
  id: string;
  _type: string;
  _attributes: string[];
  _relationships: string[];

  constructor(type: string, id: string) {
    this.id = id;
    this._type = type;
    this._attributes = [];
    this._relationships = [];
  }

  /**
   * Serialize a model.
   * @param {object} opts The options for serialization.  Available properties:
   *
   *  - `{array=}` `attributes` The list of attributes to be serialized (default: all attributes).
   *  - `{array=}` `relationships` The list of relationships to be serialized (default: all relationships).
   * @return {object} JSONAPI-compliant object
   */
  serialize = (opts: { attributes?: string[]; relationships?: string[] } = {}): JSONAPIObject => {
    const res: JSONAPIObject = { data: { type: this._type, id: this.id } };

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

    opts.attributes.forEach(key => (res.data.attributes![key] = this[key]));

    opts.relationships.forEach(key => {
      if (!this[key]) {
        res.data.relationships![key] = { data: null };
      } else if (this[key].constructor === Array) {
        res.data.relationships![key] = {
          data: this[key].map(relationshipIdentifier)
        };
      } else {
        res.data.relationships![key] = {
          data: relationshipIdentifier(this[key])
        };
      }
    });

    return res;
  };

  clone = () => {
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
  setAttribute = (attrName: string, value: any) => {
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
  setRelationship = (relName: string, models: JsonApiDataStoreModel[]) => {
    if (!(relName in this)) {
      this._relationships.push(relName);
    }
    this[relName] = models;
  };

  [key: string]: any;
}

class JsonApiDataStore {
  graph: Record<string, Record<string, JsonApiDataStoreModel>> = {};

  /**
   * Remove a model from the store.
   * @method destroy
   * @param {object} model The model to destroy.
   */
  destroy = (model: JsonApiDataStoreModel) => {
    delete this.graph[model._type][model.id];
  };

  /**
   * Retrieve a model by type and id. Constant-time lookup.
   * @method find
   * @param {string} type The type of the model.
   * @param {string} id The id of the model.
   * @return {object} The corresponding model if present, and null otherwise.
   */
  find = <T>(type: string, id: string): T | null => {
    if (!this.graph[type] || !this.graph[type][id]) {
      return null;
    }
    return (this.graph[type][id] as any) as T;
  };

  /**
   * Retrieve all models by type.
   * @param {string} type The type of the model.
   * @return {object} Array of the corresponding model if present, and empty array otherwise.
   */
  findAll = <T>(type: string): T[] => {
    if (!this.graph[type]) {
      return [];
    }
    return (Object.keys(this.graph[type]).map(id => this.graph[type][id]) as any) as T[];
  };

  /**
   * Empty the store.
   */
  reset = () => {
    this.graph = {};
  };

  cloneModel = (model: JsonApiDataStoreModel) => {
    const clone = model.clone();
    this.graph[model._type][model.id] = clone;
    return clone;
  };

  initModel = (type: string, id: string) => {
    this.graph[type] = this.graph[type] || {};
    this.graph[type][id] = this.graph[type][id] ? this.graph[type][id] : new JsonApiDataStoreModel(type, id);

    return this.graph[type][id];
  };

  findOrInit = (resource: JSONAPIData) => {
    if (!this.find(resource.type, resource.id)) {
      this.initModel(resource.type, resource.id);
    }
    return this.graph[resource.type][resource.id];
  };

  syncRecord = (record: JSONAPIData) => {
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
          } else if (rel.data.constructor === Array) {
            model[key] = rel.data.map(this.findOrInit);
          } else {
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
  syncWithMeta = (payload: JSONAPIObject | JSONAPIObjectArray) => {
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
  sync = (payload: JSONAPIObject | JSONAPIObjectArray) => {
    return this.syncWithMeta(payload).data;
  };
}

export const datastore = new JsonApiDataStore();

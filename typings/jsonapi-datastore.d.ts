declare module 'jsonapi-datastore' {
  class JsonApiDataStore {
    sync(data: {}): JsonApiDataStoreModel | JsonApiDataStoreModel[];
    syncWithMeta(data: {}): { data: JsonApiDataStoreModel | JsonApiDataStoreModel[]; meta: {} };
    destroy(model: JsonApiDataStoreModel): void;
    find<T>(type: string, id: number): T | null;
    findAll<T>(type: string): Array<T>;
  }
  class JsonApiDataStoreModel {
    serialize(): {};
  }
}

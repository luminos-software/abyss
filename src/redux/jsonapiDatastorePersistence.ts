/* eslint-disable @typescript-eslint/no-explicit-any */
import { createTransform } from 'redux-persist';
import { deserializeValue, serializeValue } from './jsonapiTransforms';

type TransformKey = string | number | symbol;

export const jsonapiDatastorePersistence = createTransform(
  // transform state coming from redux on its way to being serialized and stored
  (inboundState: {}, key: TransformKey) => serialize(inboundState, key),
  // transform state coming from storage, on its way to be rehydrated into redux
  (outboundState: {}, key: TransformKey) => deserialize(outboundState, key)
);

const serialize = (state: any, key: TransformKey): any => {
  if (key !== 'data') {
    return state;
  }

  return serializeValue(state);
};

const deserialize = (state: any, key: TransformKey): any => {
  if (key !== 'data' || !state || typeof state !== 'object') {
    return state;
  }

  return deserializeValue(state);
};

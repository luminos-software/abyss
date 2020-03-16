import { Config } from '@redux-offline/redux-offline/lib/types';
import { Action, Store } from 'redux';
interface IReduxConfig {
    offline: false | Partial<Config>;
    transloadit?: boolean;
    logger?: boolean;
}
export declare const createReduxStore: <State extends Record<string, any>>(epics: any, reducers: any, config: IReduxConfig) => Store<State, Action<any>>;
export declare let store: Store | null;
export {};

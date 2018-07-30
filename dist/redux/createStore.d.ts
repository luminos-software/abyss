import { Config } from '@redux-offline/redux-offline/lib/types';
import { Action, Store } from 'redux';
interface IReduxConfig {
    offline: false | Partial<Config>;
    transloadit?: boolean;
    logger?: boolean;
}
export declare function createReduxStore<State>(epics: any, reducers: any, config: IReduxConfig): Store<State, Action>;
export {};

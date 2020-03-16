import { Action, Store } from 'redux';
import { PersistConfig } from 'redux-persist';
interface IReduxConfig<State extends Record<string, any>> {
    offline: {
        persistCallback?: () => void;
        persistConfig?: PersistConfig<State>;
    };
    transloadit?: boolean;
    logger?: boolean;
}
export declare const createReduxStore: <State extends Record<string, any>>(epics: any, reducers: any, config: IReduxConfig<State>) => Store<State, Action<any>>;
export declare let store: Store | null;
export {};

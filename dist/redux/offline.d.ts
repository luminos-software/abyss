import { Config } from '@redux-offline/redux-offline/lib/types';
import { AbyssConfig } from 'index';
export declare type OfflineReadyConfig = typeof AbyssConfig.redux.offlineCalls;
export declare type OfflineReadyCall = keyof OfflineReadyConfig;
export declare const offlineConfig: Config;

export declare const OfflineActions: {
    rollback: import("typescript-fsa").ActionCreator<void>;
    commit: import("typescript-fsa").ActionCreator<void>;
};
export declare type State = Readonly<{}>;
export declare const reducer: (state: Readonly<{}> | undefined, action: {
    type: any;
}) => Readonly<{}>;

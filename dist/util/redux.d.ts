export declare function importToArray<PropType>(importObject: {
    [key: string]: PropType;
}): PropType[];
export declare const ReduxUtil: {
    combineEpics(...epics: Record<string, any>[]): any;
};

import { AsyncActionCreators } from 'typescript-fsa';
export declare const Transloadit: {
    action<P, S, E>(uri: string, template: string, asyncAction: AsyncActionCreators<P, S, E>, extraParams?: Record<string, string>): {
        type: string;
        meta: {
            offline: {
                effect: {
                    fileUri: string;
                    template: string;
                    extraParams: Record<string, string>;
                };
                commit: {
                    type: string;
                };
                rollback: {
                    type: string;
                };
            };
        };
    };
    uploadFile({ fileUri, template, extraParams }: {
        fileUri: string;
        template: string;
        extraParams: Record<string, string>;
    }): Promise<import("typescript-fsa").Action<{
        file: string;
        written: number;
        total: number;
    }> | null>;
};

import React from 'react';
interface IState {
    finished: boolean;
}
export declare class ThemeGate extends React.PureComponent<{
    render?: () => JSX.Element;
    onLoadFinished?: () => void;
}, IState> {
    state: IState;
    componentDidMount(): void;
    render(): {} | null | undefined;
}
export {};

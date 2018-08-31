import React from 'react';
import { ColorFormats } from 'tinycolor2';
interface IState {
    colors: ColorFormats.HSLA[];
    isModalVisible: boolean;
    selectedColor: ColorFormats.HSLA | null;
    selectedIndex: number;
}
export declare class ThemeSelector extends React.PureComponent<{}, IState> {
    state: IState;
    storeColors: () => void;
    resetColors: () => void;
    render(): JSX.Element;
}
export {};

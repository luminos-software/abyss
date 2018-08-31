import React from 'react';
import { ColorFormats } from 'tinycolor2';
interface IPickerProps {
    isVisible: boolean;
    color: ColorFormats.HSLA | null;
    onColorChange: (color: ColorFormats.HSLA) => void;
    onDismiss: () => void;
}
export declare class ColorPicker extends React.PureComponent<IPickerProps, {
    color: ColorFormats.HSLA | null;
}> {
    state: {
        color: ColorFormats.HSLA | null;
    };
    updateHue: (h: number) => void;
    updateSaturation: (s: number) => void;
    updateLightness: (l: number) => void;
    handleRgbChange: (text: string) => void;
    handleCancel: () => void;
    render(): JSX.Element | null;
}
export {};

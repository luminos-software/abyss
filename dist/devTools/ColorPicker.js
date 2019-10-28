"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const react_native_color_1 = require("react-native-color");
const react_native_modal_1 = __importDefault(require("react-native-modal"));
const tinycolor2_1 = __importDefault(require("tinycolor2"));
const Button_1 = require("./Button");
const ColorPickerStyles_1 = require("./styles/ColorPickerStyles");
class ColorPicker extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.state = { color: this.props.color };
        this.updateHue = (h) => this.setState({ color: Object.assign(Object.assign({}, this.state.color), { h }) });
        this.updateSaturation = (s) => this.setState({ color: Object.assign(Object.assign({}, this.state.color), { s }) });
        this.updateLightness = (l) => this.setState({ color: Object.assign(Object.assign({}, this.state.color), { l }) });
        this.handleRgbChange = (text) => {
            const color = tinycolor2_1.default(text);
            if (text.length === 7 && color.isValid()) {
                this.setState({ color: color.toHsl() });
            }
        };
        this.handleCancel = () => {
            this.props.onDismiss();
            this.setState({ color: this.props.color });
        };
    }
    render() {
        if (!this.state.color) {
            return null;
        }
        return (react_1.default.createElement(react_native_modal_1.default, { isVisible: this.props.isVisible, onBackdropPress: this.handleCancel, style: ColorPickerStyles_1.styles.modal, useNativeDriver: true, hideModalContentWhileAnimating: true },
            react_1.default.createElement(react_native_1.View, { style: ColorPickerStyles_1.styles.modalContent },
                react_1.default.createElement(react_native_1.Text, { style: ColorPickerStyles_1.styles.modalText }, "Hue"),
                react_1.default.createElement(react_native_color_1.HueSlider, { style: {}, gradientSteps: 40, value: this.state.color.h, onValueChange: this.updateHue }),
                react_1.default.createElement(react_native_1.Text, { style: ColorPickerStyles_1.styles.modalText }, "Saturation"),
                react_1.default.createElement(react_native_color_1.SaturationSlider, { style: {}, gradientSteps: 20, value: this.state.color.l, color: this.state.color, onValueChange: this.updateLightness }),
                react_1.default.createElement(react_native_1.Text, { style: ColorPickerStyles_1.styles.modalText }, "Lightness"),
                react_1.default.createElement(react_native_color_1.LightnessSlider, { style: {}, gradientSteps: 20, value: this.state.color.s, color: this.state.color, onValueChange: this.updateSaturation }),
                react_1.default.createElement(react_native_1.TextInput, { value: tinycolor2_1.default(this.state.color).toHexString(), style: ColorPickerStyles_1.styles.modalTextInput, onChangeText: this.handleRgbChange }),
                react_1.default.createElement(react_native_1.View, { style: [{ backgroundColor: tinycolor2_1.default(this.state.color).toRgbString() }, ColorPickerStyles_1.styles.modalColorSample] }),
                react_1.default.createElement(Button_1.Button, { title: "Ok", onPress: () => {
                        this.props.onColorChange(this.state.color);
                        this.props.onDismiss();
                    } }))));
    }
}
exports.ColorPicker = ColorPicker;
//# sourceMappingURL=ColorPicker.js.map
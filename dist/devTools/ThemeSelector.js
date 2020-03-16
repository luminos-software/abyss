"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const async_storage_1 = __importDefault(require("@react-native-community/async-storage"));
const ramda_1 = __importDefault(require("ramda"));
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const tinycolor2_1 = __importDefault(require("tinycolor2"));
const config_1 = require("../config");
const Button_1 = require("./Button");
const ColorPicker_1 = require("./ColorPicker");
const replaceColors_1 = require("./replaceColors");
const ThemeSelectorStyles_1 = require("./styles/ThemeSelectorStyles");
class ThemeSelector extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            colors: Object.keys(config_1.AbyssConfig.theme.colors).map(color => tinycolor2_1.default(config_1.AbyssConfig.theme.colors[color]).toHsl()),
            isModalVisible: false,
            selectedColor: null,
            selectedIndex: -1
        };
        this.storeColors = () => {
            const colors = ramda_1.default.fromPairs(Object.keys(config_1.AbyssConfig.theme.colors).map((color, index) => [color, tinycolor2_1.default(this.state.colors[index]).toHex8String()]));
            replaceColors_1.replaceColors(colors).then(() => require('react-native-restart').default.Restart());
        };
        this.resetColors = () => {
            async_storage_1.default.removeItem('theme.colors').then(() => require('react-native-restart').default.Restart());
        };
    }
    render() {
        return (react_1.default.createElement(react_native_1.View, { style: { flex: 1 } },
            react_1.default.createElement(react_native_1.ScrollView, { style: ThemeSelectorStyles_1.styles.container }, Object.keys(config_1.AbyssConfig.theme.colors).map((color, index) => (react_1.default.createElement(react_native_1.View, { key: color },
                react_1.default.createElement(react_native_1.Text, { style: ThemeSelectorStyles_1.styles.colorText }, color),
                react_1.default.createElement(react_native_1.TouchableWithoutFeedback, { onPress: () => this.setState({ selectedColor: this.state.colors[index], selectedIndex: index, isModalVisible: true }) },
                    react_1.default.createElement(react_native_1.View, { style: ThemeSelectorStyles_1.styles.colorContainer },
                        react_1.default.createElement(react_native_1.View, { style: [{ backgroundColor: tinycolor2_1.default(this.state.colors[index]).toRgbString() }, ThemeSelectorStyles_1.styles.colorSample] }),
                        react_1.default.createElement(react_native_1.Text, { style: ThemeSelectorStyles_1.styles.colorText }, tinycolor2_1.default(this.state.colors[index]).toHexString()))))))),
            react_1.default.createElement(Button_1.Button, { title: "Apply and restart", onPress: this.storeColors, style: ThemeSelectorStyles_1.styles.button }),
            react_1.default.createElement(Button_1.Button, { title: "Reset and restart", onPress: this.resetColors, style: ThemeSelectorStyles_1.styles.button }),
            react_1.default.createElement(ColorPicker_1.ColorPicker, { key: this.state.selectedIndex, isVisible: this.state.isModalVisible, color: this.state.selectedColor, onColorChange: color => {
                    const colors = [...this.state.colors];
                    colors[this.state.selectedIndex] = color;
                    this.setState({ colors });
                }, onDismiss: () => this.setState({ isModalVisible: false }) })));
    }
}
exports.ThemeSelector = ThemeSelector;
//# sourceMappingURL=ThemeSelector.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const config_1 = require("../config");
exports.replaceColors = (newColors) => {
    Object.keys(newColors).forEach(color => {
        const typedColor = color;
        config_1.AbyssConfig.theme.colors[typedColor] = newColors[typedColor];
    });
    return react_native_1.AsyncStorage.setItem('theme.colors', JSON.stringify(newColors));
};
//# sourceMappingURL=replaceColors.js.map
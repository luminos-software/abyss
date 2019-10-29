"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const async_storage_1 = __importDefault(require("@react-native-community/async-storage"));
const config_1 = require("../config");
exports.replaceColors = (newColors) => {
    Object.keys(newColors).forEach(color => {
        const typedColor = color;
        config_1.AbyssConfig.theme.colors[typedColor] = newColors[typedColor];
    });
    return async_storage_1.default.setItem('theme.colors', JSON.stringify(newColors));
};
//# sourceMappingURL=replaceColors.js.map
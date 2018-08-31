"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
exports.Button = props => (react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: props.onPress },
    react_1.default.createElement(react_native_1.View, { style: [
            { justifyContent: 'center', alignItems: 'center', padding: 10, backgroundColor: '#3e5151', borderRadius: 3 },
            props.style
        ] },
        react_1.default.createElement(react_native_1.Text, { style: { color: 'white', fontSize: 18 } }, props.title))));
//# sourceMappingURL=Button.js.map
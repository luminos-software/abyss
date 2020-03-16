"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const async_storage_1 = __importDefault(require("@react-native-community/async-storage"));
const react_1 = __importDefault(require("react"));
const config_1 = require("../config");
class ThemeGate extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.state = { finished: false };
    }
    componentDidMount() {
        async_storage_1.default.getItem('theme.colors')
            .then(jsonColors => {
            const storedColors = JSON.parse(jsonColors || '{}');
            Object.keys(storedColors).forEach(color => {
                const typedColor = color;
                config_1.AbyssConfig.theme.colors[typedColor] = storedColors[typedColor];
            });
            this.props.onLoadFinished && this.props.onLoadFinished();
        })
            .then(() => this.setState({ finished: true }));
    }
    render() {
        if (this.state.finished) {
            return this.props.render ? this.props.render() : this.props.children;
        }
        return null;
    }
}
exports.ThemeGate = ThemeGate;
//# sourceMappingURL=ThemeGate.js.map
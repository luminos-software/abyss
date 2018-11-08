"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_navigation_1 = require("react-navigation");
const react_redux_1 = require("react-redux");
const HeaderTitleView = (_a) => {
    var { title } = _a, props = __rest(_a, ["title"]);
    return (react_1.default.createElement(react_navigation_1.HeaderTitle, Object.assign({}, props), title));
};
exports.connectTitle = (mapStateToProps) => react_redux_1.connect(mapStateToProps)(HeaderTitleView);
//# sourceMappingURL=redux.js.map
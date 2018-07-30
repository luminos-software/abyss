"use strict";
// tslint:disable:max-classes-per-file
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Lint = require("tslint");
var Rule = /** @class */ (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoImportsWalker(sourceFile, this.getOptions()));
    };
    Rule.FAILURE_STRING = 'Importing code from outside of modules/ should be done using an absolute path.';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var DIRECTORIES = ['theme', 'lib', 'navigation', 'models', 'redux', 'repositories', 'services', 'util', 'config'];
var REGEXES = DIRECTORIES.map(function (dir) { return new RegExp("\\./" + dir + "['/]"); });
// The walker takes care of all the work.
var NoImportsWalker = /** @class */ (function (_super) {
    __extends(NoImportsWalker, _super);
    function NoImportsWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoImportsWalker.prototype.visitImportDeclaration = function (node) {
        var text = node.getText();
        if (REGEXES.some(function (regex) { return regex.test(text); })) {
            var fix = new Lint.Replacement(node.getStart(), node.getWidth(), text.replace(/\.\.\//g, '').replace(/\/index';$/, "';"));
            this.addFailureAtNode(node, Rule.FAILURE_STRING, fix);
        }
        _super.prototype.visitImportDeclaration.call(this, node);
    };
    return NoImportsWalker;
}(Lint.RuleWalker));

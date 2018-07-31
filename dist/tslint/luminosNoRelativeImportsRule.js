// tslint:disable:max-classes-per-file
import * as Lint from 'tslint';
export class Rule extends Lint.Rules.AbstractRule {
    apply(sourceFile) {
        return this.applyWithWalker(new NoImportsWalker(sourceFile, this.getOptions()));
    }
}
Rule.FAILURE_STRING = 'Importing code from outside of modules/ should be done using an absolute path.';
const DIRECTORIES = ['theme', 'lib', 'navigation', 'models', 'redux', 'repositories', 'services', 'util', 'config'];
const REGEXES = DIRECTORIES.map(dir => new RegExp(`\\.\/${dir}['/]`));
// The walker takes care of all the work.
class NoImportsWalker extends Lint.RuleWalker {
    visitImportDeclaration(node) {
        const text = node.getText();
        if (REGEXES.some(regex => regex.test(text))) {
            const fix = new Lint.Replacement(node.getStart(), node.getWidth(), text.replace(/\.\.\//g, '').replace(/\/index';$/, "';"));
            this.addFailureAtNode(node, Rule.FAILURE_STRING, fix);
        }
        super.visitImportDeclaration(node);
    }
}
//# sourceMappingURL=luminosNoRelativeImportsRule.js.map
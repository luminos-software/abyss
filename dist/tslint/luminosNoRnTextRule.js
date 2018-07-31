// tslint:disable:max-classes-per-file
import * as Lint from 'tslint';
export class Rule extends Lint.Rules.AbstractRule {
    apply(sourceFile) {
        return this.applyWithWalker(new NoImportsWalker(sourceFile, this.getOptions()));
    }
}
Rule.FAILURE_STRING = 'Importing Text directly from react-native is forbidden. Use the lib/ implementation instead.';
// The walker takes care of all the work.
class NoImportsWalker extends Lint.RuleWalker {
    visitImportDeclaration(node) {
        if (/Text[^\w].*'react-native'/.test(node.getText())) {
            this.addFailureAtNode(node, Rule.FAILURE_STRING);
        }
        super.visitImportDeclaration(node);
    }
}
//# sourceMappingURL=luminosNoRnTextRule.js.map
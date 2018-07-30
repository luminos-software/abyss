// tslint:disable:max-classes-per-file

import * as Lint from 'tslint';
import ts from 'typescript';

export class Rule extends Lint.Rules.AbstractRule {
  public static FAILURE_STRING =
    'Importing Text directly from react-native is forbidden. Use the lib/ implementation instead.';

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(new NoImportsWalker(sourceFile, this.getOptions()));
  }
}

// The walker takes care of all the work.
class NoImportsWalker extends Lint.RuleWalker {
  public visitImportDeclaration(node: ts.ImportDeclaration) {
    if (/Text[^\w].*'react-native'/.test(node.getText())) {
      this.addFailureAtNode(node, Rule.FAILURE_STRING);
    }

    super.visitImportDeclaration(node);
  }
}

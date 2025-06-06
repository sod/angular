/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

/**
 * This interface represents the lexical scope of a partial declaration in the source code.
 *
 * For example, if you had the following code:
 *
 * ```ts
 * function foo() {
 *   function bar () {
 *     ɵɵngDeclareDirective({...});
 *   }
 * }
 * ```
 *
 * The `DeclarationScope` of the `ɵɵngDeclareDirective()` call is the body of the `bar()` function.
 *
 * The `FileLinker` uses this object to identify the lexical scope of any constant statements that
 * might be generated by the linking process (i.e. where the `ConstantPool` lives for a set of
 * partial linkers).
 */
export interface DeclarationScope<TSharedConstantScope, TExpression> {
  /**
   * Get a `TSharedConstantScope` object that can be used to reference the lexical scope where any
   * shared constant statements would be inserted.
   *
   * This object is generic because different AST implementations will need different
   * `TConstantScope` types to be able to insert shared constant statements. For example in Babel
   * this would be a `NodePath` object; in TS it would just be a `Node` object.
   *
   * If it is not possible to find such a shared scope, then constant statements will be wrapped up
   * with their generated linked definition expression, in the form of an IIFE.
   *
   * @param expression the expression that points to the Angular core framework import.
   * @returns a reference to a reference object for where the shared constant statements will be
   *     inserted, or `null` if it is not possible to have a shared scope.
   */
  getConstantScopeRef(expression: TExpression): TSharedConstantScope | null;
}

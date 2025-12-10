// src/compiler.js
import { lexer } from './lexer.js';
import { parser } from './parser.js';
import { runAST } from './interpreter.js';

/**
 * compiler(input, options)
 * - input: source code string
 * - options: { argv: string[] } optional; passed into interpreter scope as ARGV
 */
export function compiler(input, options = {}) {
    const tokens = lexer(input);
    const ast = parser(tokens);
    const argv = Array.isArray(options.argv) ? options.argv : [];

    // runAST accepts a scope object as 2nd arg (your runAST already supports scope)
    runAST(ast, { ARGV: argv });
}

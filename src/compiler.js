import { lexer } from './lexer.js';
import { parser } from './parser.js';
import { runAST } from './interpreter.js';


export function compiler(input) {
     const tokens = lexer(input);
    const ast = parser(tokens);
    runAST(ast);   // directly execute the program
}

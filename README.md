# Meri Lang (YLang)

A lightweight, beginner‑friendly programming language designed to teach the fundamentals of lexing, parsing, AST generation, and interpretation. This project is a full custom language implementation written in JavaScript, built to understand how a programming language actually works under the hood.

---

## Overview

Meri Lang is a simple interpreted language with its own lexer, parser, AST builder, and execution engine. It demonstrates the complete pipeline of language implementation from raw source code to executable output.

---

## Features

* **Custom Lexer** : Converts raw source text into structured tokens.
* **Parser & AST Builder** : Turns tokens into an Abstract Syntax Tree.
* **Interpreter** : Executes the AST node-by-node.
* **Variables, Expressions, and Print Statements**.
* **Clean Modular Architecture** for easy expansion.

---

## Project Structure

```
meri-lang/
│
├── src/
│   ├── lexer.js          # Breaks source into tokens
│   ├── parser.js         # Builds the AST
│   ├── interpreter.js    # Executes the AST
│   ├── compiler.js       # (Planned) code generation / optimizations
│
├── examples/
│   └── demo.ylang        # Sample code in Meri Lang
│
├── index.js              # Entry point
├── README.md             # Project documentation
```

---

## Example Code (demo.ylang)

```
let x = 5;
let y = 10;
print(x + y);
```

Output:

```
15
```

---

## Running the Interpreter

Run this command:

```
node index.js examples/demo.ylang
```

---

##  Future Improvements

* Add control flow (if/else, while loops)
* Add functions support
* Add types and type checking
* Add modules and imports
* Add a bytecode compiler

---

## Why This Project Is Important

This project demonstrates real compiler concepts without unnecessary complexity. It’s perfect for learning:

* How languages tokenize text
* How grammars become ASTs
* How interpreters execute instructions

A solid step toward building your own full programming language.

---

## Contributing

Contributions are welcome. Open issues or create pull requests!
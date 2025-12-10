// TOKEN HELPER
function peek(tokens) {
    return tokens[0];
}

function next(tokens) {
    return tokens.shift();
}

function expect(tokens, value) {
    let token = next(tokens);
    if (!token || token.value !== value) {
        throw new Error(`Expected '${value}' but got '${token ? token.value : "EOF"}'`);
    }
}

// PRIMARY (numbers, identifiers, parentheses)
function parsePrimary(tokens) {
    let token = peek(tokens);

    if (!token) throw new Error("Unexpected end of input in primary");

    if (token.type === "number") {
        return {
            type: "NumberLiteral",
            value: Number(next(tokens).value)
        };
    }

// IDENTIFIER (+ optional indexing: ARGV[0], arr[i], etc.)
if (token.type === "identifier") {
    const idToken = next(tokens); // consume identifier

    // Base node
    let node = {
        type: "Identifier",
        name: idToken.value
    };

    // Support chained indexing: a[0], a[1][2], etc.
    while (peek(tokens) && peek(tokens).type === "LBRACKET") {
        next(tokens); // consume '['
        const indexExpr = parseExpression(tokens);
        
        if (!peek(tokens) || peek(tokens).type !== "RBRACKET") {
            throw new Error("Missing closing ']' in index expression");
        }
        next(tokens); // consume ']'

        node = {
            type: "IndexExpression",
            object: node,
            index: indexExpr
        };
    }

    return node;
}


  if (token.type === "string") {
    return {
        type: "StringLiteral",
        value: next(tokens).value
    };
}

    throw new Error("Unexpected token in primary: " + token.value);
}

// MULTIPLICATIVE (*,/)
function parseMultiplicative(tokens) {
    let left = parsePrimary(tokens);

    while (peek(tokens) && (peek(tokens).value === "*" || peek(tokens).value === "/")) {
        let operator = next(tokens).value;
        let right = parsePrimary(tokens);

        left = {
            type: "BinaryExpression",
            operator,
            left,
            right
        };
    }

    return left;
}

// ADDITIVE (+,-)
function parseAdditive(tokens) {
    let left = parseMultiplicative(tokens);

    while (peek(tokens) && (peek(tokens).value === "+" || peek(tokens).value === "-")) {
        let operator = next(tokens).value;
        let right = parseMultiplicative(tokens);

        left = {
            type: "BinaryExpression",
            operator,
            left,
            right
        };
    }

    return left;
}

// COMPARISON OPERATORS (<, >, <=, >=, ==, !=)
function parseComparison(tokens) {
    let left = parseAdditive(tokens);

    while (
        peek(tokens) &&
        ["<", ">", "<=", ">=", "==", "!="].includes(peek(tokens).value)
    ) {
        let operator = next(tokens).value;
        let right = parseAdditive(tokens);

        left = {
            type: "BinaryExpression",
            operator,
            left,
            right
        };
    }

    return left;
}

// TOP-LEVEL EXPRESSION
function parseExpression(tokens) {
    return parseComparison(tokens);
}

// PARSE BLOCK { ... }
function parseBlock(tokens) {
    const body = [];

    while (tokens.length > 0 && peek(tokens).value !== "}") {
        body.push(parseStatement(tokens));
    }

    expect(tokens, "}");   // end block
    return body;
}

// PARSE A SINGLE STATEMENT
function parseStatement(tokens) {
    let token = next(tokens);

    // VARIABLE DECLARATION
    if (token.type === "Keyword" && token.value === "ye") {
        let nameToken = next(tokens);

        let node = {
            type: "Declaration",
            name: nameToken.value,
            value: null
        };

        if (peek(tokens) && peek(tokens).value === "=") {
            next(tokens);
            node.value = parseExpression(tokens);
        }

        return node;
    }

    

    // PRINT
    if (token.type === "Keyword" && token.value === "bol") {
        return {
            type: "Print",
            expression: parseExpression(tokens)
        };
    }

    // IF / ELSE
    // agar (x > 10) { ... } warna { ... }
    if (token.type === "Keyword" && token.value === "agar") {

        expect(tokens, "(");
        let condition = parseExpression(tokens);
        expect(tokens, ")");

        expect(tokens, "{");
        let consequent = parseBlock(tokens);

        let alternate = null;

        if (peek(tokens) && peek(tokens).value === "warna") {
            next(tokens);            // consume warna
            expect(tokens, "{");
            alternate = parseBlock(tokens);
        }

        return {
            type: "IfStatement",
            condition,
            consequent,
            alternate
        };
    }

// WHILE LOOP — jabtak (condition) { ... }
   if (token.type === "Keyword" && token.value === "jabtak") {

    expect(tokens, "(");
    const condition = parseExpression(tokens);
    expect(tokens, ")");

    expect(tokens, "{");
    const body = parseBlock(tokens);

    return {
        type: "WhileLoop",
        condition,
        body
    };
}


    // REASSIGNMENT
    if (token.type === "identifier") {
        let name = token.value;

        expect(tokens, "=");
        let value = parseExpression(tokens);

        return {
            type: "Assignment",
            name,
            value
        };
    }

    throw new Error("Unexpected token in statement: " + token.value);
}

// MAIN PARSER
export function parser(tokens) {
    const ast = {
        type: "Program",
        body: []
    };

    while (tokens.length > 0) {
        ast.body.push(parseStatement(tokens));
    }

    return ast;
}

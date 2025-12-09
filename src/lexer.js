export function lexer(input) {
    const tokens = [];
    let cursor = 0;

    while (cursor < input.length) {
        let char = input[cursor];

        // WHITESPACE
        if (/\s/.test(char)) {
            cursor++;
            continue;
        }

        // ------------------------------------
// COMMENTS SHOULD COME HERE
// ------------------------------------

// Single-line comment: //
if (char === "/" && input[cursor + 1] === "/") {
    cursor += 2;
    while (cursor < input.length && input[cursor] !== "\n") cursor++;
    continue;
}

// Multi-line comment: /* ... */
if (char === "/" && input[cursor + 1] === "*") {
    cursor += 2;
    while (
        cursor < input.length &&
        !(input[cursor] === "*" && input[cursor + 1] === "/")
    ) {
        cursor++;
    }
    cursor += 2;
    continue;
}

        // ------------------------------------
        // IDENTIFIERS + KEYWORDS
        // ------------------------------------
        if (/[a-zA-Z]/.test(char)) {
            let word = '';

            while (/[a-zA-Z0-9]/.test(char)) {
                word += char;
                char = input[++cursor];
            }

            // Add new keywords
            if (
                word === 'ye' ||
                word === 'bol' ||
                word === 'agar' ||
                word === 'warna' ||
                word === 'jabtak'
            ) {
                tokens.push({ type: 'Keyword', value: word });
            } else {
                tokens.push({ type: 'identifier', value: word });
            }

            continue;
        }

        // ------------------------------------
        // NUMBER
        // ------------------------------------
        if (/[0-9]/.test(char)) {
            let num = '';

            while (/[0-9]/.test(char)) {
                num += char;
                char = input[++cursor];
            }

            tokens.push({ type: 'number', value: parseInt(num) });
            continue;
        }

       // ------------------------------------
// BLOCK BRACES
// ------------------------------------
if (char === '{' || char === '}') {
    tokens.push({ type: 'brace', value: char });
    cursor++;
    continue;
}

// ------------------------------------
// PARENTHESES
// ------------------------------------
if (char === '(' || char === ')') {
    tokens.push({ type: 'paren', value: char });
    cursor++;
    continue;
}


        // ------------------------------------
        // COMPARISON + ARITHMETIC OPERATORS
        // ------------------------------------
        if (/[\+\-\*\/=<>!]/.test(char)) {
            let op = char;
            let nextChar = input[cursor + 1];

            // Handle >= <= == !=
            if (
                (op === '>' || op === '<' || op === '=' || op === '!') &&
                nextChar === '='
            ) {
                op += nextChar;
                cursor += 2;
            } else {
                cursor++;
            }

            tokens.push({ type: 'operator', value: op });
            continue;
        }

        // ------------------------------------
// STRING LITERALS: "hello world"
// ------------------------------------
if (char === '"') {
    let str = "";
    cursor++; // skip opening quote
    char = input[cursor];

    while (cursor < input.length && char !== '"') {
        str += char;
        cursor++;
        char = input[cursor];
    }

    if (char !== '"') {
        throw new Error("Unterminated string literal");
    }

    cursor++; // skip closing quote

    tokens.push({ type: "string", value: str });
    continue;
}
        
        throw new Error("Unexpected character: " + char);
    }

    return tokens;
}

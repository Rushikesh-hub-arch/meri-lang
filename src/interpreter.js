// src/interpreter.js

export function runAST(node, scope = {}) {
    switch(node.type) {
        case "Program":
            node.body.forEach(n => runAST(n, scope));
            break;

        case "Declaration":
            scope[node.name] = evaluateExpression(node.value, scope);
            break;

        case "Assignment":
            scope[node.name] = evaluateExpression(node.value, scope);
            break;

        case "Print":
            console.log(evaluateExpression(node.expression, scope));
            break;

        case "IfStatement":
            if (evaluateExpression(node.condition, scope)) {
                node.consequent.forEach(n => runAST(n, scope));
            } else if (node.alternate) {
                node.alternate.forEach(n => runAST(n, scope));
            }
            break;

            case "WhileLoop":
    while (evaluateExpression(node.condition, scope)) {
        for (const stmt of node.body) {
            runAST(stmt, scope);
        }
    }
    break;


        default:
            throw new Error("Unknown AST node type: " + node.type);
    }
}

function evaluateExpression(node, scope) {
    switch(node.type) {
        case "NumberLiteral":
            return node.value;

        case "Identifier":
            if (!(node.name in scope)) {
                throw new Error(`Variable ${node.name} is not defined`);
            }
            return scope[node.name];

        case "BinaryExpression":
            const left = evaluateExpression(node.left, scope);
            const right = evaluateExpression(node.right, scope);

            switch(node.operator) {
                case "+": return left + right;
                case "-": return left - right;
                case "*": return left * right;
                case "/": return left / right;
                case ">": return left > right;
                case "<": return left < right;
                case ">=": return left >= right;
                case "<=": return left <= right;
                case "==": return left == right;
                case "!=": return left != right;
                default: throw new Error("Unknown operator: " + node.operator);
            }

            

        case "StringLiteral":
             return node.value;
    
        default:
            throw new Error("Unknown expression type: " + node.type);
    }
}

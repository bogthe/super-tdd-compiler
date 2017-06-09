'use strict';

function tokenizer(input) {
    let current = 0;
    let tokens = [];
    let WHITESPACE = /\s/;
    let CHARACTER = /[a-z]/i;
    let NUMBER = /[0-9]/;

    while (current < input.length) {
        let char = input[current];

        if (char === '(') {
            tokens.push({
                type: 'paren', value: '('
            });

            current++;
            continue;
        }

        if (char === ')') {
            tokens.push({
                type: 'paren', value: ')'
            });

            current++;
            continue;
        }

        if (WHITESPACE.test(char)) {
            current++;
            continue;
        }

        if (CHARACTER.test(char)) {
            let value = '';
            while (CHARACTER.test(char)) {
                if (char) {
                    value += char;
                    char = input[++current];
                } else {
                    break;
                }
            }

            tokens.push({
                type: 'name', value: value
            });
            continue;
        }

        if (NUMBER.test(char)) {
            let value = '';
            while (NUMBER.test(char)) {
                if (char) {
                    value += char;
                    char = input[++current];
                } else {
                    break;
                }
            }

            tokens.push({
                type: 'number', value: value
            });
            continue;
        }

        if (char === '"') {
            let value = '';
            char = input[++current];
            while (char != '"') {
                value += char;
                char = input[++current];

                if(current >= input.length){
                    throw new SyntaxError("String does not terminate!");
                }
            }

            tokens.push({
                type: 'string', value: value
            });
            current++;
            continue;
        }

        throw new TypeError("Unrecognized character:" + char);
    }

    return tokens;
}

module.exports = {
    tokenizer
};
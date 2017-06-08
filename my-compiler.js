'use strict';
/*
(add 2 (subtract 4 2))
 *
 * Tokens might look something like this:
 *
 *   [
 *     { type: 'paren',  value: '('        },
 *     { type: 'name',   value: 'add'      },
 *     { type: 'number', value: '2'        },
 *     { type: 'paren',  value: '('        },
 *     { type: 'name',   value: 'subtract' },
 *     { type: 'number', value: '4'        },
 *     { type: 'number', value: '2'        },
 *     { type: 'paren',  value: ')'        },
 *     { type: 'paren',  value: ')'        },
 *   ]
*/
function tokenizer(input) {
    let current = 0;
    let tokens = [];

    while (current < input.length) {
        let char = input[current];

        if (char === '(') {
            tokens.push({
                type: 'paren',
                value: '('
            });

            current++;
            continue;
        }

        if(char === ')'){
            tokens.push({
                type: 'paren',
                value: ')'
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
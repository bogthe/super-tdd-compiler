const {
    transformer
} = require('../my-compiler');
const assert = require('assert');

let mockObject = {
    defaultInitial() {
        return {
            type: 'Program',
            body: [{
                type: 'CallExpression',
                name: 'add',
                params: []
            }]
        }
    },

    defaultExpected() {
        return {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    calle: {
                        type: 'Identifier',
                        name: 'add'
                    },
                    arguments: []
                }
            }]
        }
    }
}
let testObject = {
    callExpressionHandle: function () {
        let expected = mockObject.defaultExpected();
        let initial = mockObject.defaultInitial();

        assert.deepStrictEqual(transformer(initial), expected);
    }
}

for (var method in testObject) {
    testObject[method]();
}

console.log('all tests finished!');
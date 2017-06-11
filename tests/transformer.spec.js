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

        assert.deepStrictEqual(transformer(initial), expected, "Should return an empty expression with no arguments");
    },

    callNumberHandler: function () {
        let expected = mockObject.defaultExpected();
        expected.body[0].expression.arguments = [
            { type: 'NumberLiteral', value: '4' },
            { type: 'NumberLiteral', value: '7' }
        ];

        let initialAst = mockObject.defaultInitial();
        initialAst.body[0].params = [
            { type: 'NumberLiteral', value: '4' },
            { type: 'NumberLiteral', value: '7' }
        ];

        assert.deepStrictEqual(transformer(initialAst), expected, "Should transform a basic signature with two arguments");
    },

    handleComplexCallStatements: function () {
        let expected = mockObject.defaultExpected();
        expected.body[0].expression.arguments = [
            { type: 'NumberLiteral', value: '2' },
            {
                type: 'CallExpression',
                calle: { type: 'Identifier', name: 'subtract' },
                arguments: [
                    { type: 'NumberLiteral', value: '4' },
                    { type: 'NumberLiteral', value: '2' }
                ]
            }
        ];

        let initialAt = mockObject.defaultInitial();
        initialAt.body[0].params = [
            { type: 'NumberLiteral', value: '2' },
            {
                type: 'CallExpression',
                name: 'subtract',
                params: [
                    { type: 'NumberLiteral', value: '4' },
                    { type: 'NumberLiteral', value: '2' }
                ]
            }
        ];

        assert.deepStrictEqual(transformer(initialAt), expected, "Should handle nested methods");
    }
}

for (var method in testObject) {
    testObject[method]();
}

console.log('all tests finished!');
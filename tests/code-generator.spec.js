const {
    codeGenerator
} = require('../my-compiler');

const assert = require('assert');

let mockObject = {
    defaultProgram() {
        return {
            type: 'Program',
            body: []
        }
    }
}
let testObject = {
    emptyProgram: function () {
        let input = mockObject.defaultProgram();
        let expected = "";

        assert.deepStrictEqual(codeGenerator(input), '', "Should return empty string if empty program");
    },

    oneMethodProgram: function () {
        let expected = "add(2, 4);";
        let input = mockObject.defaultProgram();
        input.body = [{
            type: 'ExpressionStatement',
            expression: {
                type: 'CallExpression',
                calle: {
                    type: 'Identifier',
                    name: 'add'
                },
                arguments: [
                    { type: 'NumberLiteral', value: '2' },
                    { type: 'NumberLiteral', value: '4' }
                ]
            }
        }];

        assert.deepStrictEqual(codeGenerator(input), expected, "Should correctly parse a one line simple method command");
    },

    oneLineComposedMethodProgram: function () {
        let expected = "add(2, substract(4, 7));";
        let input = mockObject.defaultProgram();
        input.body = [{
            type: 'ExpressionStatement',
            expression: {
                type: 'CallExpression',
                calle: {
                    type: 'Identifier',
                    name: 'add'
                },
                arguments: [
                    { type: 'NumberLiteral', value: '2' },
                    {
                        type: 'CallExpression',
                        calle: {
                            type: 'Identifier',
                            name: 'substract'
                        },
                        arguments: [
                            { type: 'NumberLiteral', value: '4' },
                            { type: 'NumberLiteral', value: '7' }
                        ]
                    }
                ]
            }
        }];

        assert.deepStrictEqual(codeGenerator(input), expected, "Should parse one line composed method");
    },

    multipleLineSimpleMethod: function () {
        let expected = 'foo(4, 7);\nbar("9", "2");';
        let input = mockObject.defaultProgram();
        input.body = [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    calle: {
                        type: 'Identifier',
                        name: 'foo'
                    },
                    arguments: [
                        { type: 'NumberLiteral', value: '4' },
                        { type: 'NumberLiteral', value: '7' },
                    ]
                }
            },
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    calle: {
                        type: 'Identifier',
                        name: 'bar'
                    },
                    arguments: [
                        { type: 'StringLiteral', value: '9' },
                        { type: 'StringLiteral', value: '2' }
                    ]
                }
            }
        ];

        assert.deepStrictEqual(codeGenerator(input), expected, "Should handle multiple line statements properly");
    }
}

for (var method in testObject) {
    testObject[method]();
}

console.log("all tests finished!");
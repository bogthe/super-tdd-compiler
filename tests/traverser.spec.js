const {
    traverser
} = require('../my-compiler');

const assert = require('assert');

let mockObjects = {
    defaultAT: function () {
        return {
            type: 'Program',
            body: [{
                type: 'CallExpression',
                name: 'add',
                params: [
                    { type: 'NumberLiteral', value: '2' },
                    {
                        type: 'CallExpression',
                        name: 'subtract',
                        params: [
                            { type: 'NumberLiteral', value: '4' },
                            { type: 'NumberLiteral', value: '2' }
                        ]
                    }]
            }]
        };
    },

    visitor: function (testResult) {
        return {
            Program: {
                enter(node, parent) {
                    testResult.counter++;
                }
            },
            CallExpression:{
                enter(node,parent){
                    testResult.counter++;
                }
            },
            NumberLiteral:{
                enter(node,parent){
                    testResult.counter++;
                }
            }
        }
    }
};
let testObject = {
    traverseProgramBody: function () {
        let input = mockObjects.defaultAT();
        let actual = { counter: 0 };
        let visitor = mockObjects.visitor(actual);

        traverser(input, visitor);

        assert.deepStrictEqual(actual.counter, 6, "Should correctly traverse the program body all it's chidren");
    }
}

for (var method in testObject) {
    testObject[method]();
}

console.log("all tests finished!");
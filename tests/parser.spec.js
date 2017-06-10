const {
    parser
} = require('../my-compiler');

const assert = require('assert');

/*
const ast = {
  type: 'Program',
  body: [{
    type: 'CallExpression',
    name: 'add',
    params: [{
      type: 'NumberLiteral',
      value: '2'
    }, {
      type: 'CallExpression',
      name: 'subtract',
      params: [{
        type: 'NumberLiteral',
        value: '4'
      }, {
        type: 'NumberLiteral',
        value: '2'
      }]
    }]
  }]
};
*/

let programBP = {
    default: function () {
        return { type: 'Program', body: [] };
    }
};
let testObject = {
    defaultProgramBoilerPlate: function () {
        let input = [];
        let expected = programBP.default();

        assert.deepStrictEqual(parser(input), expected, "Should return default boiler plate code");
    },

    numberLiterals: function () {
        let input = [{ type: 'number', value: '4792' }];
        let expected = programBP.default();
        expected.body.push({ type: 'NumberLiteral', value: '4792' });

        assert.deepStrictEqual(parser(input), expected, "Should handle number literals");
    },

    stringLiteral: function () {
        let input = [{ type: 'string', value: '"hello world"' }];
        let expected = programBP.default();
        expected.body.push({ type: 'StringLiteral', value: '"hello world"' });

        assert.deepStrictEqual(parser(input), expected, "Should handle string literals");
    },

    numberAndStringLiterals: function () {
        let input = [
            { type: 'number', value: '4792' },
            { type: 'string', value: '"hello w"' }
        ];
        let expected = programBP.default();
        expected.body.push(
            { type: 'NumberLiteral', value: '4792' },
            { type: 'StringLiteral', value: '"hello w"' }
        );

        assert.deepStrictEqual(parser(input), expected, "Should combine strings and number literals properly");
    },

    unknownTypes: function () {
        let input = [{ type: 'unknown', value: 'yes I am' }];

        assert.throws(function () { parser(input); }, SyntaxError);
    }
}

for (var method in testObject) {
    testObject[method]();
}

console.log("all tests finished!");
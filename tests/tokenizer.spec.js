const {
    tokenizer
} = require('../my-compiler');

const assert = require('assert');

const testObject = {
    leftParenTest: function () {
        let input = "((";
        let expected = [
            { type: 'paren', value: '(' },
            { type: 'paren', value: '(' }
        ];

        assert.deepStrictEqual(tokenizer(input), expected, "Should return left paren tokens");
    },

    rightParenTest: function () {
        let input = ")))";
        let expected = [
            { type: 'paren', value: ')' },
            { type: 'paren', value: ')' },
            { type: 'paren', value: ')' }
        ];

        assert.deepStrictEqual(tokenizer(input), expected, "Should return right paren tokens");
    },

    whiteSpaceTest: function () {
        let input = " ";
        let expected = [];
        assert.deepStrictEqual(tokenizer(input), expected, "Should not return anything if only white space found");
    }
};

for (var testMethod in testObject) {
    testObject[testMethod]();
}

console.log("all tests finished!");
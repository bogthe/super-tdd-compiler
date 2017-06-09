const {
    tokenizer
} = require('../my-compiler');

const assert = require('assert');

const testObject = {
    leftParenTest: function () {
        let input = '((';
        let expected = [
            { type: 'paren', value: '(' },
            { type: 'paren', value: '(' }
        ];
        assert.deepStrictEqual(tokenizer(input), expected, "Should return left paren tokens");
    },

    rightParenTest: function () {
        let input = ')))';
        let expected = [
            { type: 'paren', value: ')' },
            { type: 'paren', value: ')' },
            { type: 'paren', value: ')' }
        ];
        assert.deepStrictEqual(tokenizer(input), expected, "Should return right paren tokens");
    },

    whiteSpaceTest: function () {
        let input = ' ';
        let expected = [];
        assert.deepStrictEqual(tokenizer(input), expected, "Should not return anything if only white space found");
    },

    functionNameTest: function () {
        let input = 'add';
        let expected = [
            { type: 'name', value: 'add' }
        ];
        assert.deepStrictEqual(tokenizer(input), expected, "Should return the method name");
    },

    functionNumberTest: function () {
        let input = '1119';
        let expected = [
            { type: 'number', value: '1119' }
        ];
        assert.deepStrictEqual(tokenizer(input), expected, "Should return number");
    },

    functionStringTest: function () {
        let input = '"hello"';
        let expected = [
            { type: 'string', value: 'hello' }
        ];
        assert.deepStrictEqual(tokenizer(input), expected, "Should return a string");
    },

    functionOpenStringTest: function () {
        let input = '"hello';

        assert.throws(function () { tokenizer(input); }, SyntaxError);
    },

    fullAddTokenizerTest: function () {
        let input = '(add 2 (subtract 4 2))';
        let expected = [
            { type: 'paren', value: '(' },
            { type: 'name', value: 'add' },
            { type: 'number', value: '2' },
            { type: 'paren', value: '(' },
            { type: 'name', value: 'subtract' },
            { type: 'number', value: '4' },
            { type: 'number', value: '2' },
            { type: 'paren', value: ')' },
            { type: 'paren', value: ')' }
        ];

        assert.deepStrictEqual(tokenizer(input), expected, "Should create the tokens for a add function");
    },
    
    fullConcatTest: function(){
        let input = 'concat "hello" "world"';
        let expected = [
            { type: 'name', value: 'concat' },
            { type: 'string', value: 'hello' },
            { type: 'string', value: 'world' },
        ];

        assert.deepStrictEqual(tokenizer(input), expected, "Should create tokens for concat func");
    }
};

for (var testMethod in testObject) {
    testObject[testMethod]();
}

console.log("all tests finished!");
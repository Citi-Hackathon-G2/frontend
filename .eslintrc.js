module.exports = {
    env: {
        browser: true,
        es2020: true,
    },
    extends: ['airbnb-base'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    rules: {
        noimplicitAny: 0,
    },
    extends: ['prettier'],
};

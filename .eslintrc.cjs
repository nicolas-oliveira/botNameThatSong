/* eslint-disable no-undef */
module.exports = {
    env: {
        node: true,
        es2018: true,
    },
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 9,
        sourceType: "module",
    },
    plugins: ["@typescript-eslint"],
    rules: {
        quotes: ["error", "double"],
        semi: ["error", "always"],
    },
};

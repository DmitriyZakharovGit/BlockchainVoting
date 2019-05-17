module.exports = {
    parser: 'babel-eslint',
    env: {
        browser: true,
        es6: true,
    },
    extends: [
        "airbnb-base",
        "plugin:react/recommended",
        "eslint:recommended",
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: [
        'react',
    ],
    rules: {
        "arrow-body-style": 'warn',
        "import/no-unresolved": "off",
        "use-isnan": ["error"],
        "one-var": ["error", "never"],
        "quotes": ["error", "single", {"allowTemplateLiterals": true}],
        "sort-vars": ["error", {"ignoreCase": true}],
        "react/no-render-return-value": "error",
        "react/no-did-mount-set-state": "error",
        "object-curly-spacing": ["error", "always"],
        'react/jsx-sort-props': [
            'error',
            {
                noSortAlphabetically: false,
                ignoreCase: true,
                callbacksLast: false,
                shorthandLast: true,
                reservedFirst: true,
            },
        ],
    }
};
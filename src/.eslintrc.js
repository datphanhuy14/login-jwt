module.exports = {
    "env": {
        "es2021": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "rules": {
        'require-jsdoc': 0,
        'new-cap': 0,
        "arrow-parens": [2, "always"],
        "arrow-spacing": 2,
        "no-var": "warn",
        "prefer-const": "warn",
        "no-console": "off",
        "global-require": "off",
        "indent": [
            "warn",
            4,
            {
                "MemberExpression": 1,
                "SwitchCase": 1,
                "VariableDeclarator": 2
            }
        ],
        "linebreak-style": ["off", "unix"],
        "semi": ["warn", "always"],
        "no-unused-vars": [
            "warn",
            {
                "vars": "all",
                "args": "none",
                "ignoreRestSiblings": false
            }
        ]
    }
};

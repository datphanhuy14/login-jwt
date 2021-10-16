module.exports = {
    "env": {
        "es2021": true,
        "node" :true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "rules": {
        'require-jsdoc': 0,
        'new-cap': 0,
        "no-var": 2,
        "semi": [ 2, "always" ],
        "space-in-parens": [ 2, "always" ],
        "space-infix-ops": 2,
        "space-unary-ops": [ 2, { "words": true, "nonwords": false } ],
        "spaced-comment": [ 2, "always" ],
    
        "arrow-parens": [ 2, "always" ],
        "arrow-spacing": 2,
    }
};

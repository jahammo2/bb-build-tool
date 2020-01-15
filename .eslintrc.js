module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
      "airbnb",
      "eslint:recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
      "max-len": ["error", { "code": 120, "ignoreComments": true }],
      "func-names": "off",
      "no-use-before-define": "off",
      "no-restricted-globals": "off"
    }
};

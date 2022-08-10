module.exports = {
  "env": {
    "browser": true,
    "node": true
  },
  "overrides": [
    {
      "files": ["**/__tests__/**/*.{js,jsx,ts,tsx}", "?(*.){spec,test}.{js,jsx,ts,tsx}"],
      "env": {
        "jest": true
      },
      "globals": {
        "compose": true,
        "testHook": true,
        "withRouter": true,
        "withRouterAndParams": true,
        "registerTestLocaleService": true,
        "act": true,
        __FULL_ENV__: true
      }
    }
  ],
  "globals": {
    "shallow": true,
    "mount": true,
    __FULL_ENV__: true
  },
  "root": true,
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "extends": [
    "airbnb",
    "plugin:jsx-a11y/recommended"
  ],
  "plugins": [
    "react",
    "jsx-a11y",
    "react-hooks"
  ],
  "rules": {
    "linebreak-style": 0,
    "import/no-dynamic-require": 0,
    "comma-dangle": "off",
    "arrow-parens": ["error", "always"],
    "global-require": 0,
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "no-warning-comments": "warn",
    "indent": [
      "error",
      4,
      {
        "SwitchCase": 1
      }
    ],
    "arrow-body-style": "off",
    "strict": [
      2,
      "never"
    ],
    "spaced-comment": [
      "error",
      "always",
      {
        "exceptions": [
          "-",
          "+",
          "*"
        ],
        "markers": [
          "/",
          "!",
          ","
        ]
      }
    ],
    "object-shorthand": "off",
    "react/prefer-stateless-function": "off",
    "react/jsx-filename-extension": "off",
    "react/jsx-indent": ["error",
      3
    ],
    "react/jsx-indent-props": ["error",
      3
    ],
    "valid-jsdoc": ["error", {
      "requireParamDescription": false,
      "requireReturnDescription": false,
      "requireReturn": false,
      "prefer": {
        "return": "returns"
      }
    }]
  },
};

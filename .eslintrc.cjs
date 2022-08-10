module.exports = {
   env: {
      browser: true,
      node: true
   },
   overrides: [
      {
         files: ['**/__tests__/**/*.{js,jsx,ts,tsx}', '?(*.){spec,test}.{js,jsx,ts,tsx}'],
         env: {
            jest: true
         },
         globals: {
            compose: true,
            testHook: true,
            withRouter: true,
            withRouterAndParams: true,
            registerTestLocaleService: true,
            act: true,
            __FULL_ENV__: true
         }
      }
   ],
   globals: {
      shallow: true,
      mount: true,
      __FULL_ENV__: true
   },
   root: true,
   parser: '@babel/eslint-parser',
   parserOptions: {
      ecmaFeatures: {
         jsx: true
      }
   },
   extends: ['airbnb', 'prettier', 'plugin:jsx-a11y/recommended', 'plugin:react/jsx-runtime'],
   plugins: ['react', 'jsx-a11y', 'react-hooks'],
   rules: {
      'linebreak-style': 0,
      'import/no-dynamic-require': 0,
      'comma-dangle': 'off',
      'arrow-parens': ['error', 'always'],
      'global-require': 0,
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'no-warning-comments': 'warn',
      indent: [
         'error',
         3,
         {
            SwitchCase: 1
         }
      ],
      'arrow-body-style': 'off',
      strict: [2, 'never'],
      'spaced-comment': [
         'error',
         'always',
         {
            exceptions: ['-', '+', '*'],
            markers: ['/', '!', ',']
         }
      ],
      'object-shorthand': 'off',
      'import/prefer-default-export': 'off',
      'react/prefer-stateless-function': 'off',
      'react/jsx-filename-extension': 'off',
      'react/jsx-indent': ['error', 3],
      'react/prop-types': 'off',
      'react/function-component-definition': 'off',
      'react/jsx-props-no-spreading': 'off',
      'jsx-a11y/label-has-associated-control': [
         2,
         {
            labelComponents: ['CustomLabel'],
            labelAttributes: ['inputLabel'],
            controlComponents: ['Input', 'TextField'],
            assert: 'both',
            depth: 3
         }
      ],
      'no-return-assign': ['warn', 'except-parens'],
      'react/jsx-indent-props': ['error', 3],
      'no-else-return': ['error', { allowElseIf: true }],
      'valid-jsdoc': [
         'error',
         {
            requireParamDescription: false,
            requireReturnDescription: false,
            requireReturn: false,
            prefer: {
               return: 'returns'
            }
         }
      ]
   }
};

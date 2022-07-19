module.exports = {
   env: {
      browser: true,
      es2021: true
   },
   extends: ['eslint:recommended', 'plugin:react/recommended'],
   parser: '@typescript-eslint/parser',
   parserOptions: {
      ecmaFeatures: {
         jsx: true
      },
      ecmaVersion: 'latest',
      sourceType: 'module'
   },
   plugins: ['react'],
   rules: {
      indent: ['warn', 'space'],
      'linebreak-style': ['warn', 'windows'],
      quotes: ['warn', 'single'],
      semi: ['warn', 'never']
   }
};

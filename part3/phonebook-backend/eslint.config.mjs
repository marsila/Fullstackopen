import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',//sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    plugins: {
      react,
    },
    settings: {
      react: {
        version: '18.2',//version: 'detect',
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      'indent': ['error', 2],
      'linebreak-style': 0, // Set to 0 to ignore Windows/Unix differences
      'quotes': ['error', 'single'],
      'semi': ['error', 'never'],
      'eqeqeq': 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { 'before': true, 'after': true }],
      'no-console': 0,
      'react/react-in-jsx-scope': 'off',
      'no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }] // This fixes the _res error //(ignore when starts with _)
    },
  },
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
]
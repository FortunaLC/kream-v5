// @ts-check
import stylistic from '@stylistic/eslint-plugin'
import unusedImports from 'eslint-plugin-unused-imports'

import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  plugins: {
    'unused-imports': unusedImports,
    '@stylistic': stylistic,
  },
  rules: {
    'no-console': ['error', { allow: ['warn', 'error'] }],

    // Enforces no unused variables, with exceptions for emit, props, and variables starting with _
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'none',
        caughtErrors: 'none',
        varsIgnorePattern: '(emit|props|_*)',
      },
    ],

    '@stylistic/semi': ['error', 'never'],
    '@stylistic/comma-dangle': ['error', 'always-multiline'],
    '@stylistic/eol-last': ['error', 'always'],
    '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],

    '@typescript-eslint/no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
      },
    ],

    // Enforces string templates over string concatenation
    'prefer-template': 'error',

    // Enforces consistent order of blocks in Vue components (template, script, style)
    'vue/block-order': 'error',
    'vue/attribute-hyphenation': 'error',
    'vue/v-on-event-hyphenation': 'error',
    'vue/attributes-order': 'error',
    'vue/html-indent': ['error', 2],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: {
          max: 3,
        },
        multiline: {
          max: 1,
        },
      },
    ],

    // Enforces newlines between content in multiline elements, except for pre and textarea
    'vue/multiline-html-element-content-newline': [
      'error',
      {
        allowEmptyLines: true,
        ignores: ['pre', 'textarea'],
      },
    ],

    // Enforces newlines between content in single-line elements, with exceptions for empty elements
    'vue/singleline-html-element-content-newline': [
      'error',
      {
        ignoreWhenNoAttributes: true,
        ignoreWhenEmpty: true,
      },
    ],

    // Error on unused imports
    'unused-imports/no-unused-imports': 'error',

    // Enforce a consistent import order
    'import/order': [
      'error',
      {
        'groups': [
          ['builtin', 'external'],
          ['internal', 'parent', 'sibling', 'index', 'object'],
        ],
        'newlines-between': 'always',
        'alphabetize': { order: 'asc', caseInsensitive: true },
      },
    ],

    // Requires strict comparison operators
    'eqeqeq': ['error', 'always'],
    '@typescript-eslint/unified-signatures': 'off',
  },
})

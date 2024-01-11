module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'standard-with-typescript',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:i18next/recommended',
    'plugin:storybook/recommended',
  ],
  ignorePatterns: ['eslintrc.js', 'jsonServer/**/*', 'scripts/**/*', 'config/jest/jest.polyfills.ts',],
  overrides: [
    {
      files: ['*.ts',],
      parserOptions: {
        project: './tsconfig.json',
      },
      rules: {
        '@typescript-eslint/prefer-nullish-coalescing': 'off',
      },
    },
    {
      files: ['*.stories.tsx', '*.stories.ts',],
      rules: {
        'react-hooks/rules-of-hooks': 'off',
        '@typescript-eslint/consistent-type-assertions': 'off',
        'i18next/no-literal-string': 'off',
      },
    },
    {
      files: ['*.d.ts',],
      parserOptions: {
        project: './tsconfig.json',
      },
      rules: {
        '@typescript-eslint/naming-convention': 'off',
        '@typescript-eslint/consistent-type-imports': 'off',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['react', 'i18next', 'react-hooks', 'ulbi-eslint-plugin', 'unused-imports',],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/no-dynamic-delete': 'warn',
    '@typescript-eslint/comma-dangle': 'off',
    'react/react-in-jsx-scope': 'off',
    'n/handle-callback-err': 'off',
    'n/no-callback-literal': 'off',
    'import/no-unresolved': 'off',
    'react/prop-types': 'off',
    'ulbi-eslint-plugin/path-checker': ['error', { alias: '@', },],
    'ulbi-eslint-plugin/layer-imports': ['error', {
      alias: '@',
      ignoreFilesPatterns: ['**/src/shared/config/storybook/**/*.(ts|tsx)', '**/src/shared/config/tests/**/*.(ts|tsx)',],
    },],
    'ulbi-eslint-plugin/public-api-imports': ['error', {
      alias: '@',
      ignorePatterns: ['**/config/**/*',],
      testFilesPatterns: ['**/*.test.(ts|tsx)', '**/*.stories.(ts|tsx)',],
    },],
    '@typescript-eslint/return-await': 'off',
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return', },
    ],
    'max-len': [
      'error',
      {
        code: 110,
        ignoreComments: true,
        ignoreStrings: true,
        ignoreRegExpLiterals: true,
      },
    ],
    '@typescript-eslint/member-delimiter-style': ['error', {
      multiline: {
        delimiter: 'semi',
        requireLast: true,
      },
      singleline: {
        delimiter: 'semi',
        requireLast: false,
      },
    },],
    'no-empty': [2,],
    'no-empty-function': [2, { allow: ['constructors',], },],
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': 'off',
    'react/jsx-max-props-per-line': [
      'error',
      { maximum: { single: 3, multi: 1, }, },
    ],
    'react/jsx-closing-bracket-location': ['error', 'tag-aligned',],
    indent: [
      'error',
      2,
      {
        ignoredNodes: ['JSXElement', 'JSXAttribute',],
        SwitchCase: 1,
        offsetTernaryExpressions: true,
      },
    ],
    'i18next/no-literal-string': [2, { markupOnly: true, },],
    '@typescript-eslint/semi': ['error', 'always',],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-indent-props': [2, 2,],
    'react/jsx-indent': [2, 2,],
    'comma-dangle': [
      'error',
      {
        arrays: 'always',
        objects: 'always',
        imports: 'never',
        exports: 'never',
        functions: 'never',
      },
    ],
  },
};

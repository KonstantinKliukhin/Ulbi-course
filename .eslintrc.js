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
  ignorePatterns: ['eslintrc.js',],
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
  plugins: [
    'react',
    'i18next',
    'react-hooks',
  ],
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
    'max-len': ['error', { code: 110, ignoreComments: true, ignoreStrings: true, ignoreRegExpLiterals: true, },],
    'react/jsx-max-props-per-line': ['error', { maximum: { single: 3, multi: 1, }, },],
    'react/jsx-closing-bracket-location': ['error', 'tag-aligned',],
    'i18next/no-literal-string': [2, { markupOnly: true, },],
    '@typescript-eslint/semi': ['error', 'always',],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-indent-props': [2, 2,],
    'react/jsx-indent': [2, 2,],
    'comma-dangle': ['error', {
      arrays: 'always',
      objects: 'always',
      imports: 'never',
      exports: 'never',
      functions: 'never',
    },],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};

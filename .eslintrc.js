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
        '@typescript-eslint/consistent-type-assertions': 'off',
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
    '@typescript-eslint/comma-dangle': 'off',
    'react/react-in-jsx-scope': 'off',
    'n/handle-callback-err': 'off',
    'import/no-unresolved': 'off',
    'max-len': ['error', { code: 110, ignoreComments: true, ignoreStrings: true, ignoreRegExpLiterals: true, },],
    'i18next/no-literal-string': [2, { markupOnly: true, },],
    'react/jsx-indent-props': [2, 2,],
    'react/jsx-indent': [2, 2,],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/semi': ['error', 'always',],
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

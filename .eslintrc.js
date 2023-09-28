module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'standard-with-typescript',
    'plugin:react/recommended',
    'plugin:i18next/recommended'
  ],
  ignorePatterns: ['eslintrc.js'],
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        project: './tsconfig.json'
      },
      rules: {
        '@typescript-eslint/prefer-nullish-coalescing': 'off'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react',
    'i18next',
  ],
  rules: {
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    '@typescript-eslint/comma-dangle': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-indent': [2, 2],
    'react/jsx-indent-props': [2, 2],
    'import/no-unresolved': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    'n/handle-callback-err': 'off',
    'i18next/no-literal-string': [2, { markupOnly: true }],
    'max-len': ['error', { code: 90, ignoreComments: true, ignoreStrings: true }],
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}

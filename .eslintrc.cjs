module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', 'prettier', 'unused-imports'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'import/no-unresolved': 'off',
    'import/named': "off",
    'no-unused-vars': 'off', // or "@typescript-eslint/no-unused-vars": "off",
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
    ],
    'react/prop-types': 'off',
    'prettier/prettier': [
      'warn',
      {
        semi: true, // точка с запятой - нет
        trailingComma: 'all', // запятая в последней строке - да
        singleQuote: true, // использовать одинарные кавычки - да!
        printWidth: 120, // длина строки - 80
        tabWidth: 3, // длина "таба" - 2 пробела
        arrowParens: 'avoid',
        jsxSingleQuote: true,
        useTabs: false, // длина строки - 80
        endOfLine: 'auto',
        proseWrap: 'always',
        //      "quoteProps": "as-needed",
        //      "bracketSpacing": true,
        //      "bracketSameLine": false,
        //      "jsxBracketSameLine": false, // закрывающийся jsx в этой же строке
        //      "parser": "typescript" // парсер - flow (пока не важно)
      },
    ],
  },
}

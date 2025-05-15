import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tsEslint from 'typescript-eslint';

export default tsEslint.config(
  // 1) Ignorar este config file
  {
    ignores: ['eslint.config.mjs'],
  },
  // 2) Regras básicas do ESLint
  eslint.configs.recommended,
  // 3) Tipagem e regras do TypeScript-ESLint
  ...tsEslint.configs.recommendedTypeChecked,
  // 4) Plugin Prettier (para formatar)
  eslintPluginPrettierRecommended,
  // 5) Suas regras customizadas + overrides
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      ecmaVersion: 2020,
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Força LF e demais regras de estilo
      'prettier/prettier': ['error', { endOfLine: 'lf' }],
      // Suas customizações gerais
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      // Protege produção contra chamadas unsafe...
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/no-unsafe-call': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-return': 'warn',
    },
    overrides: [
      {
        // ** Só para testes **
        files: ['**/*.spec.ts'],
        rules: {
          // Desativa as proteções `no-unsafe-*` nos specs
          '@typescript-eslint/no-unsafe-argument': 'off',
          '@typescript-eslint/no-unsafe-member-access': 'off',
          '@typescript-eslint/no-unsafe-call': 'off',
          '@typescript-eslint/no-unsafe-assignment': 'off',
          '@typescript-eslint/no-unsafe-return': 'off',
        },
      },
    ],
  },
);

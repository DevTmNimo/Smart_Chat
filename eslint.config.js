// eslint.config.js
import { defineConfig } from 'eslint/config';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import security from 'eslint-plugin-security';
import nodePlugin from 'eslint-plugin-n';

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  security.configs.recommended,
  nodePlugin.configs['flat/recommended'],

  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['eslint.config.js'],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      n: { version: '>=v24.19.0' }, // 👈 confirm with `node -v` and match exactly
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      'no-console': ['warn', { allow: ['warn', 'error' , 'log'] }],

      'security/detect-object-injection': 'warn',
      'security/detect-non-literal-regexp': 'error',
      'security/detect-possible-timing-attacks': 'warn',

      eqeqeq: 'error',
      'no-implicit-coercion': 'error',
      complexity: ['warn', 12],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/array-type': 'error',
    },
  },

  // Config file itself: not part of the type-checked project, and its
  // imports are dev tooling, not production dependencies — treat separately.
  {
    files: ['eslint.config.js'],
    extends: [tseslint.configs.disableTypeChecked],
    rules: {
      'n/no-unpublished-import': 'off',
    },
  },

  {
    ignores: ['dist/**', 'node_modules/**', 'coverage/**'],
  },
);
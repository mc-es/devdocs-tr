import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },
  },
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'dist/**',
      'build/**',
      'out/**',
      'coverage/**',
      'public/**',
      '*.config.*',
      '*.d.ts',
    ],
  },
  {
    rules: {
      //- TypeScript specific rules
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/no-deprecated': 'error',
      '@typescript-eslint/no-duplicate-enum-values': 'error',
      '@typescript-eslint/no-duplicate-type-constituents': 'error',
      '@typescript-eslint/no-empty-object-type': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/no-mixed-enums': 'error',
      '@typescript-eslint/no-require-imports': 'error',
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',

      //+ General JavaScript rules
      'arrow-body-style': ['error', 'as-needed'],
      'block-scoped-var': 'error',
      'consistent-return': 'error',
      curly: ['error', 'multi-or-nest'],
      'default-case': 'error',
      'default-case-last': 'error',
      'default-param-last': 'error',
      eqeqeq: ['error', 'always'],
      'for-direction': 'error',
      'func-name-matching': ['error', 'never'],
      'func-names': ['error', 'as-needed'],
      'guard-for-in': 'error',
      'id-length': ['error', { exceptions: ['x', 'y', 'z', 'i', 't'], max: 30, min: 2 }],
      'logical-assignment-operators': ['error', 'always'],
      'no-alert': 'error',
      'no-array-constructor': 'error',
      'no-await-in-loop': 'error',
      'no-bitwise': 'error',
      'no-case-declarations': 'error',
      'no-compare-neg-zero': 'error',
      'no-cond-assign': 'error',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-constant-binary-expression': 'error',
      'no-delete-var': 'error',
      'no-dupe-else-if': 'error',
      'no-duplicate-case': 'error',
      'no-else-return': ['error', { allowElseIf: true }],
      'no-empty': ['error', { allowEmptyCatch: true }],
      'no-empty-function': ['error', { allow: ['arrowFunctions'] }],
      'no-eq-null': 'error',
      'no-eval': 'error',
      'no-ex-assign': 'error',
      'no-extra-bind': 'error',
      'no-extra-boolean-cast': 'error',
      'no-labels': 'error',
      'no-lonely-if': 'error',
      'no-loss-of-precision': 'error',
      'no-multi-str': 'error',
      'no-nested-ternary': 'error',
      'no-new-func': 'error',
      'no-new-wrappers': 'error',
      'no-octal': 'error',
      'no-param-reassign': 'error',
      'no-shadow': 'error',
      'no-shadow-restricted-names': 'error',
      'no-sparse-arrays': 'error',
      'no-template-curly-in-string': 'error',
      'no-throw-literal': 'error',
      'no-undef-init': 'error',
      'no-undefined': 'error',
      'no-unneeded-ternary': 'error',
      'no-unsafe-finally': 'error',
      'no-var': 'error',
      'prefer-exponentiation-operator': 'error',
      'prefer-object-has-own': 'error',
      'prefer-object-spread': 'error',
      'prefer-promise-reject-errors': 'error',
      'prefer-regex-literals': 'error',
      'prefer-spread': 'error',
      'prefer-template': 'error',
      'require-await': 'error',
      semi: ['error', 'always'],
      'sort-vars': 'error',
      'use-isnan': 'error',
      'valid-typeof': 'error',
      yoda: 'error',
    },
  },
];

export default eslintConfig;

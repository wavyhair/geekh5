/*
 * @Author: chenjie
 * @Date: 2022-07-11 20:12:21
 * @LastEditors: chenjie
 * @LastEditTime: 2022-07-13 19:18:13
 * @FilePath: \react-geekh5-ts\.eslintrc.js
 * @Description:
 * Copyright (c) 2022 by chenjie, All Rights Reserved.
 */
/* eslint-env node */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
}

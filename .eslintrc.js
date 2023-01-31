module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['airbnb-base', 'standard', 'eslint:recommended', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', '@typescript-eslint/eslint-plugin'],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['~', '.'],
          ['@', './src']
        ],
        extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.mts', '.d.ts']
      },
      node: { extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.mts', '.d.ts'] }
    }
  },
  // rules: {
  //   camelcase: 0, // 驼峰命名
  //   '@typescript-eslint/interface-name-prefix': 'off',
  //   '@typescript-eslint/explicit-function-return-type': 'off',
  //   '@typescript-eslint/explicit-module-boundary-types': 'off',
  //   '@typescript-eslint/no-explicit-any': 'off',
  //   '@typescript-eslint/no-var-requires': 0,
  //   '@typescript-eslint/ban-ts-ignore': 'off',
  //   '@typescript-eslint/no-unused-vars': 'off'
  // },
  rules: {
    'import/extensions': [
      'warn',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        mjs: 'never',
        ts: 'never',
        tsx: 'never',
        mts: 'never'
      }
    ],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true, peerDependencies: true }],
    'import/order': [
      'error',
      {
        'newlines-between': 'never',
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        pathGroups: [
          {
            pattern: 'vue',
            group: 'external',
            position: 'before'
          },
          {
            pattern: 'vue-router',
            group: 'external',
            position: 'before'
          },
          {
            pattern: 'vuex',
            group: 'external',
            position: 'before'
          },
          {
            pattern: 'pinia',
            group: 'external',
            position: 'before'
          },
          {
            pattern: 'naive-ui',
            group: 'external',
            position: 'before'
          },
          {
            pattern: '@/config',
            group: 'internal',
            position: 'before'
          },
          {
            pattern: '@/settings',
            group: 'internal',
            position: 'before'
          },
          {
            pattern: '@/enum',
            group: 'internal',
            position: 'before'
          },
          {
            pattern: '@/plugins',
            group: 'internal',
            position: 'before'
          },
          {
            pattern: '@/layouts',
            group: 'internal',
            position: 'before'
          },
          {
            pattern: '@/views',
            group: 'internal',
            position: 'before'
          },
          {
            pattern: '@/components',
            group: 'internal',
            position: 'before'
          },
          {
            pattern: '@/router',
            group: 'internal',
            position: 'before'
          },
          {
            pattern: '@/service',
            group: 'internal',
            position: 'before'
          },
          {
            pattern: '@/store',
            group: 'internal',
            position: 'before'
          },
          {
            pattern: '@/context',
            group: 'internal',
            position: 'before'
          },
          {
            pattern: '@/composables',
            group: 'internal',
            position: 'before'
          },
          {
            pattern: '@/hooks',
            group: 'internal',
            position: 'before'
          },
          {
            pattern: '@/utils',
            group: 'internal',
            position: 'before'
          },
          {
            pattern: '@/assets',
            group: 'internal',
            position: 'before'
          },
          {
            pattern: '@/**',
            group: 'internal',
            position: 'before'
          }
        ],
        pathGroupsExcludedImportTypes: ['vue', 'vue-router', 'vuex', 'pinia', 'naive-ui']
      }
    ],
    'import/no-unresolved': ['error', { ignore: ['uno.css', '~icons/*', 'virtual:svg-icons-register'] }],
    'import/prefer-default-export': 'off',
    'max-classes-per-file': 'off',
    // 'no-param-reassign': [
    //   'error',
    //   {
    //     props: true,
    //     ignorePropertyModificationsFor: ['state', 'acc', 'e']
    //   }
    // ],
    'no-dupe-class-members': 'off',
    'no-shadow': 'off',
    'no-unused-vars': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports', disallowTypeAnnotations: false }],
    '@typescript-eslint/no-empty-interface': [
      'error',
      {
        allowSingleExtends: true
      }
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { vars: 'all', args: 'all', ignoreRestSiblings: false, varsIgnorePattern: '^_', argsIgnorePattern: '^_' }
    ],
    '@typescript-eslint/no-use-before-define': ['error', { classes: true, functions: false, typedefs: false }]
  },
  overrides: [
    {
      files: ['*.json'],
      rules: { 'no-unused-expressions': 'off' }
    }
  ]
};

import js from '@eslint/js';
import globals from 'globals';

const testGlobals = {
  describe: 'readonly',
  it: 'readonly',
  test: 'readonly',
  expect: 'readonly',
  beforeEach: 'readonly',
  afterEach: 'readonly',
  beforeAll: 'readonly',
  afterAll: 'readonly',
  // Provided at runtime by spec/setup.browser.mjs in the browser project.
  loki: 'readonly',
  IncrementalIndexedDBAdapter: 'readonly'
};

// Rules that flag long-standing, intentional patterns in this codebase.
// Tightening them would require rewriting library internals, which is out of
// scope for a tooling modernization.
const legacyRules = {
  'no-prototype-builtins': 'off',
  'no-unused-vars': 'off',
  'no-useless-assignment': 'off',
  'no-redeclare': 'off',
  'no-useless-catch': 'off',
  'no-empty': 'off'
};

export default [
  {
    ignores: [
      'benchmark/**',
      'build/**',
      'coverage/**',
      'demos/**',
      'docs/**',
      'examples/**',
      'original/**',
      'presentations/**',
      'tutorials/**'
    ]
  },
  js.configs.recommended,
  {
    files: ['src/**/*.js'],
    languageOptions: {
      ecmaVersion: 2018,
      sourceType: 'commonjs',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.commonjs,
        define: 'readonly',
        // UMD global expected by src/loki-angular.js
        loki: 'readonly',
        // Optional dependency of the "jquery-extend-deep" clone method
        jQuery: 'readonly'
      }
    },
    rules: legacyRules
  },
  {
    files: ['src/**/*.mjs'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  {
    files: ['spec/**/*.js'],
    languageOptions: {
      ecmaVersion: 2018,
      sourceType: 'commonjs',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.commonjs,
        ...testGlobals
      }
    },
    rules: {
      ...legacyRules
    }
  },
  {
    files: ['spec/**/*.mjs'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  }
];

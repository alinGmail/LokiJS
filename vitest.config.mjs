import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';

// Browser tests use Playwright's bundled Chromium by default.
// Set PLAYWRIGHT_CHANNEL=chrome to use a locally installed Google Chrome
// instead (useful when browser downloads are disabled).
const channel = process.env.PLAYWRIGHT_CHANNEL;

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'unit',
          environment: 'node',
          globals: true,
          include: ['spec/generic/**/*.spec.js', 'spec/node/**/*.spec.js'],
          // These two files only contain commented-out example specs.
          exclude: [
            'spec/node/cryptedFileAdapter.spec.js',
            'spec/node/nodePersistence.spec.js'
          ],
          setupFiles: ['./spec/setup.shared.mjs'],
        },
      },
      {
        test: {
          name: 'browser',
          globals: true,
          include: ['spec/browser/**/*.spec.js'],
          setupFiles: ['./spec/setup.shared.mjs', './spec/setup.browser.mjs'],
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(channel ? { launchOptions: { channel } } : {}),
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
    coverage: {
      provider: 'v8',
      include: ['src/lokijs.js'],
      reporter: ['text', 'html'],
      reportsDirectory: 'coverage',
    },
  },
});

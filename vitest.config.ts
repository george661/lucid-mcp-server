import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    server: {
      deps: {
        inline: [
          '@api/lucid-developer-docs'
        ]
      }
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage',
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80
        }
      },
      exclude: [
        'node_modules/',
        'build/',
        'coverage/',
        '**/*.d.ts',
        'vitest.config.ts',
        'test/**'
      ]
    },
    include: ['test/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts}'],
    exclude: [
      'test/extractImage.js',
      'test/mcpClientListDocuments.cjs',
      'test/mcpClientListDocuments.js'
    ]
  }
});
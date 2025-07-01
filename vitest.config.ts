import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    
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
        'test/**',
        './scripts/**',
        './.api/**',
        './.api/apis/lucid-developer-docs/**',
      ]
    },
    include: ['test/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts}'],
    exclude: [
      '.api/apis/lucid-developer-docs/**'
    ],
    setupFiles: ['./test/setup.ts']
  }
});
import { configDefaults, defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react(),
    svgr({
      svgrOptions: {
        ref: true,
        svgo: false,
        titleProp: true,
      },
      include: '**/*.svg',
    }),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      enabled: true,
      provider: 'v8',
      include: [
        'src/components/organisms/search/NewsCard/index.tsx',
        'src/components/atoms/ProfileImage/index.tsx',
        'src/components/atoms/NewsScrapIcon/index.tsx',
      ],

      // exclude
      exclude: [
        'node_modules/',
        'src/**/*.spec.ts',
        'src/**/*.test.ts',
        'src/**/*.spec.tsx',
        'src/**/*.test.tsx',
      ],
      // 모든 파일 계측 비활성화
      all: false,
    },
    reporters: ['default', 'html'],
    // include: ['src/components/atoms/Input/Input.test.tsx'],
    exclude: [...configDefaults.exclude],
  },
});

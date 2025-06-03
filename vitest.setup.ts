import '@testing-library/jest-dom';
import { queryClient } from '@/queries/queryClient';
import startMsw from '@/msw/startMsw';
import { cleanup } from '@testing-library/react';
import server from '@/msw/server';

beforeAll(async () => {
  await startMsw();
});

beforeEach(() => {
  cleanup();
  // 쿼리 클라이언트 초기화
  queryClient.clear();
});

afterAll(() => {
  server.close();
});

vi.mock('@next/font/local', () => ({
  __esModule: true,
  default: () => ({
    className: 'mock-font-class',
    style: { fontFamily: 'MockFont' },
  }),
}));

vi.mock('next/router', () => ({
  useRouter: () => ({
    asPath: '/',
    push: vi.fn(),
    replace: vi.fn(),
    pathname: '/',
    query: {},
    isFallback: false,
    isLocaleDomain: false,
    isPreview: false,
    isReady: true,
    defaultLocale: 'en',
    locale: 'en',
    locales: ['en'],
  }),
}));

vi.mock('*.svg', () => ({ default: '<svg></svg>' }));

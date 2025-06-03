import { TextEncoder, TextDecoder } from 'util';
import { TransformStream } from 'stream/web';
import { BroadcastChannel } from 'worker_threads';
import '@testing-library/jest-dom/extend-expect';
import 'cross-fetch/polyfill';
// test환경에 없는 브라우저 api를 전역객체로 설정
// msw2.0 & jest 연동중 발생
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
global.TransformStream = TransformStream;
global.BroadcastChannel = BroadcastChannel;

// next/router mock
vi.mock('next/router', () => ({
  useRouter: vi.fn().mockReturnValue({
    query: {
      query: '테스트검색',
    },
  }),
}));

// intersection observer mock
window.IntersectionObserver = vi.fn(function () {
  this.observe = vi.fn();
  this.unobserve = vi.fn();
  this.disconnect = vi.fn();
});

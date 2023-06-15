import { TNewsItem, TPageProps } from '@/types';

// Toast ui duration
export const TOAST_DURATION = 3000;
// 앱 정식 이름
export const APP_NAME = 'My News Vault';
// pageProps 초기값
export const initialPageProps: TPageProps = {
  userInfo: null,
  dehydratedState: null,
  status: false,
};

// 쿠키 설정
export const COOKIE_CONFIG = {
  path: '/',
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  maxAge: 60 * 60 * 24, // 1 day
};

export const defaultNewsItem: TNewsItem = {
  newsId: '',
  datePublished: '등록된 날짜 없음',
  description: '설명 없음',
  providerIcon: '',
  providerName: '',
  thumbnail: '',
  title: '제목 없음',
  isScrapped: false,
  searchQuery: '',
  url: '',
};

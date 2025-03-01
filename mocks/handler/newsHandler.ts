import { FETCH_NEWS_COUNT_PER_PAGE } from '@/constants';
import { mockBingNewsRes, mockScarpNewsList } from '@/mock';
import { HttpResponse, http } from 'msw';

// JSONPlaceholder API를 모킹하기 위한 MSW 핸들러 예시
export default [
  // 모든 게시글 조회
  http.get('https://jsonplaceholder.typicode.com/posts', ({ params }) => {
    const mockPosts = [
      { userId: 1, id: 1, title: '테스트 글 제목 #1', body: '내용 예시 #1' },
      { userId: 2, id: 2, title: '테스트 글 제목 #2', body: '내용 예시 #2' },
    ];
    return HttpResponse.json(mockPosts);
  }),
  // fetchBingNews
  http.get(
    `https://api.bing.microsoft.com/v7.0/news/search?mkt=en-us&q=&count=20&offset=0`,
    ({ params, request }) => {
      console.log('######################### mock called');
      // status 200
      return HttpResponse.json(mockBingNewsRes, {
        status: 200,
      });
    },
  ),

  // TODO: BE 확정되면 개선
  // fetchScrappedList
  http.get(`/api/scrap`, ({ params, request }) => {
    return HttpResponse.json(mockScarpNewsList, {
      status: 200,
    });
  }),

  // TODO: BE 확정되면 개선
  // scrapNews
  http.patch(`/api/scrap`, () => {
    return HttpResponse.json(
      { data: 'success from msw' },
      {
        status: 201,
      },
    );
  }),

  // TODO: BE 확정되면 개선
  // unscrapNews
  http.delete(`/api/scrap`, () => {
    return HttpResponse.json(
      { data: 'success from msw' },
      {
        status: 201,
      },
    );
  }),
];

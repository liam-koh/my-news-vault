'use client';

import { queryFn, useFetchBingNewsList } from '@/queries/useBingNewsFetch';
import QueryForm from '@/components/form/NewsSearchForm';
import { TBingNewsQuery } from '@/types';
import { Suspense, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import NewsCardList14 from './NewsCardList14';
import { useAtom } from 'jotai';
import searchQueryAtom from '@/store/atoms/searchQueryAtom';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

interface IProps {
  query: TBingNewsQuery['query'];
}

const Container = styled.div`
  width: 100%;
  height: auto;
  position: relative;
  .search {
    width: 100%;
    height: 2.5rem;
    margin-top: 1.75rem;
  }
  .news-results {
    margin-top: 3rem;
    padding-bottom: 5rem;
    position: relative;
  }
`;

/**
 * 뉴스 리스트 출력 컴포넌트
 */
export default function NewsSearchPage14() {
  return (
    <Container className="flex-column">
      <div className="search">
        <QueryForm />
      </div>
      <Suspense fallback={<div>loading...</div>}>
        <NewsCardList14 />
      </Suspense>
    </Container>
  );
}

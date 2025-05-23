'use client';

import NewsGridList from '@/components/atoms/NewsGridList';
import React, { useMemo } from 'react';
import useScrappedNewsList from '@/queries/useScrappedNewsList';
import useAuth from '@/hooks/useAuth';
import NewsCard from '@/components/organisms/search/NewsCard';

export default function ScrapGridList() {
  const { data } = useScrappedNewsList();
  return (
    <NewsGridList>
      {data.map((item) => (
        <NewsCard newsItem={item} key={item.newsId} />
      ))}
    </NewsGridList>
  );
}

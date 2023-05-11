import { INewsItem } from '@/types';
import React from 'react';
import styled from 'styled-components';
import NewsThumbnailView from '../NewsThumbnailView';
import { scrapNews, unscrapNews } from '@/api/client';

const Container = styled.div`
  width: 300px;
  height: 500px;
  border: 1px solid black;
  border-radius: 10px;
  margin-bottom: 30px;
  background-color: #ffffff;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);

  .news-title {
    font-size: 20px;
  }

  .news-desc {
    font-size: 15px;
    margin: 15px 0;
  }
`;

const NewsItemView = ({ item }: { item: INewsItem }) => {
  const onClickVisit = () => {
    window.open(item.thumbnail);
  };

  const onClickScarp = async () => {
    await scrapNews('userId', item);
    alert('success');
  };

  const onClickDeleteScrap = async () => {
    await unscrapNews('userId', item.newsId);
    alert('success');
  };

  return (
    <Container>
      <p className="news-title">{item.title}</p>
      <NewsThumbnailView src={item.thumbnail} alt={`${item.title} thumbnail`} />
      <p className="news-desc">{item.description}</p>
      <button onClick={onClickVisit}>방문하기</button>
      <button onClick={onClickScarp}>스크랩</button>
      <button onClick={onClickDeleteScrap}>스크랩 삭제</button>
      <div>스크랩여부: {item.isScrapped?.toString()}</div>
    </Container>
  );
};

export default NewsItemView;

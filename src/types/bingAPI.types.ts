import { IBingNewsAPIResModel } from './models/bingAPI.model';
import { UArrayItem } from './utils.types';

/**
 * News item model interface
 */
export type TRawNewsItem = UArrayItem<IBingNewsAPIResModel['value']>;

/**
 *  클라이언트에서 사용할 뉴스 객체 형식
 */
export interface INewsItem {
  newsId: string;
  datePublished: TRawNewsItem['datePublished'];
  description: TRawNewsItem['description'];
  providerIcon: TRawNewsItem['provider'][0]['image']['thumbnail']['contentUrl'];
  providerName: TRawNewsItem['provider'][0]['name'];
  thumbnail: TRawNewsItem['image']['thumbnail']['contentUrl'];
  title: TRawNewsItem['name'];
  isScrapped: boolean;
  url: TRawNewsItem['url'];
  searchQuery: string;
};
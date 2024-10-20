import { UArrayItem } from '../utils.types';

/**
 * Bing News API res model interface
 */
export interface IBingNewsAPIResModel {
  queryContext: {
    adultIntent: boolean;
    originalQuery: string;
  };
  readLink: string;
  totalEstimatedMatches: number;
  value: {
    datePublished: string;
    description: string;
    headline?: true;
    name: string;
    image?: {
      thumbnail: {
        contentUrl: string;
        height: number;
        width: number;
      };
      name?: string;
    };
    provider: {
      _type?: string;
      image?: {
        thumbnail?: {
          contentUrl?: string;
          width?: number;
          height?: number;
        };
      };
      name?: string;
    }[];
    url: string;
    category?: string;
    about?: any;
    mentions?: any;
    video?: any;
  }[];
  sort?: any;
}

import { TBingNewsQuery } from '@/types';
import { atom } from 'jotai';

const searchQueryAtom = atom<TBingNewsQuery>({
  query: '',
  page: 0,
});

export default searchQueryAtom;

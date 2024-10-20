import { TBingNewsQuery } from '@/types';
import { atom } from 'jotai';

const searchQueryAtom = atom<TBingNewsQuery>({
  query: '',
  page: 0,
});

// write용 atom
const readWriteSearchQueryAtom = atom(null, (get, set, newState: Partial<TBingNewsQuery>) => {
  const curState = get(searchQueryAtom);

  set(searchQueryAtom, {
    ...curState,
    ...newState,
  });
});

export default searchQueryAtom;

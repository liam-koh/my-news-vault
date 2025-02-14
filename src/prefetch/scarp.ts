import { GetServerSidePropsContext } from 'next';
import { TPageProps, TUserInfo } from '@/types';
import { dehydrate } from '@tanstack/react-query';
import { queryClient } from '@/queries/queryClient';
import { prefetchScrappedNewsList } from '@/queries/useScrappedNewsList';
import ERRCODE from '@/constants/errCode';
import _ from 'lodash';
import QUERY_KEY from '@/queries/keys';

/**
 *
 * @param context: ssr context
 * @param pageProps: page props
 * @returns react query dehydrate 추가된 pageProps
 */
export const getDehydratedStateInServerside = async (
  pageProps: TPageProps,
): Promise<TPageProps> => {
  if (pageProps.userInfo) {
    await prefetchScrappedNewsList(pageProps.userInfo.email);
    const { queries } = dehydrate(queryClient);

    return {
      ...pageProps,
      dehydratedState: dehydrate(queryClient),
    };
  } else {
    return {
      ...pageProps,
      dehydratedState: null,
    };
  }
};

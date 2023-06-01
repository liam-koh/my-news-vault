import Meta from '@/components/common/Meta';
import NewsSearchPage from '@/components/search/NewsSearchPage';
import { TPageProps } from '@/types';
import { getPrefetch, getUserInfo, initialPageProps, parseCategory } from '@/utils/serverside';
import { GetServerSideProps } from 'next';
import React from 'react';
import Layout from '@/components/layout';
import { UserInfoProvider } from '@/utils/userInfoProvider';

const NewsSearchWithCategory = ({ category, userInfo }) => {
  return (
    <UserInfoProvider initialUserInfo={userInfo || null}>
      <Layout>
        <Meta title={`ILoveNews-${category}`} />
        <NewsSearchPage category={category} />
      </Layout>
    </UserInfoProvider>
  );
};

export const getServerSideProps: GetServerSideProps<TPageProps> = async (context) => {
  try {
    // FIXME: 리팩토링 필요
    const res1 = await getUserInfo(context, initialPageProps);
    const res2 = await getPrefetch(context, res1);
    const res3 = parseCategory(context, res2);
    return {
      props: res3,
    };
  } catch (e) {
    return {
      props: {
        status: false,
        userInfo: null,
      },
    };
  }
};

export default NewsSearchWithCategory;

import React from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import {
  dehydrate,
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import MainRanking from "../components/Ranking/MainRanking";
import useRankings from "../hooks/Ranking/useRankings";
import LoadingScreen from "../components/Common/LoadingScreen";
import HeadMeta from "../components/Common/HeadMeta";

const RankingPage = () => {
  const { data, error, isLoading } = useRankings();
  const router = useRouter();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    alert(error.message);
    router.push("/");
  }

  return (
    <>
      <HeadMeta
        title="오늘의 레시피 랭킹"
        description="오늘 가장 인기 많은 레시피들을 확인해보세요."
        url="http://www.hcmk.com/ranking"
      />
      <MainRanking data={data} />
    </>
  )
};

const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1 * 60 * 1000,
        cacheTime: 3 * 60 * 1000,
        refetchOnWindowFocus: true,
        refetchOnMount: false,
        retry: true,
      },
    },
  });
  await queryClient.prefetchQuery("rankings", useRankings);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default RankingPage;

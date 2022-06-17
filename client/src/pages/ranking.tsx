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

const Page = () => {
  const { data } = useRankings();
  return <MainRanking ranking={data} />;
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

export default Page;

import React from "react";
import type { ReactElement } from "react";
import Layout from "../components/Common/Layout";
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
import fetchRankings from "../hooks/Ranking/useRankings";
import MainSearch from "../components/Main/MainSearch";
import MainRanking from "../components/Main/MainRanking";
import kkokko1 from "../../public/assets/kkokko_1.png";
import kkokko2 from "../../public/assets/kkokko_2.png";
import kkokko3 from "../../public/assets/kkokko_3.png";

import axios from "axios";

const Page = () => {
  const { data } = useQuery("rankings", fetchRankings);
  // console.log(data);
  // console.log(typeof data);


  return (
    <Layout>
      <MainSearch />
      <MainRanking ranking={data} />
    </Layout>
  );
};

// Page.getLayout = function getLayout(page: ReactElement) {
//   return (
//     <Layout>
//       {page}
//     </Layout>
//   );
// };

const getServerSideProps: GetServerSideProps = async (context) => {
  // const res = await fetch(`/api/main/ranking`);
  // const data = await res.json();
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("rankings", fetchRankings);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Page;

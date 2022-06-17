import React, { useState } from "react";
import type { ReactElement } from "react";
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
import useRankings from "../hooks/Ranking/useRankings";
import useSearchText from "../hooks/Search/useSearchStr"
import MainSearch from "../components/Main/MainSearch";
import MainRanking from "../components/Main/MainRanking";
import kkokko1 from "../../public/assets/kkokko_1.png";
import kkokko2 from "../../public/assets/kkokko_2.png";
import kkokko3 from "../../public/assets/kkokko_3.png";
import axios from "axios";
import main from "../../public/assets/main.png"
import Image from "next/image";
import styles from "./index.module.scss";


const Page = () => {
  const {data} = useRankings();
  console.log(data);
  console.log(typeof data);
  const router = useRouter();

  return (
    <div className={styles.background}>
      <div className={styles.overlay}>
        <h1>이젠 집에서 해드세요.</h1>
        <h2>집밥꼬꼬선생이 있습니다.</h2>
      </div>
      <Image
        src={main}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        placeholder="blur"
      />
    </div>
  );
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

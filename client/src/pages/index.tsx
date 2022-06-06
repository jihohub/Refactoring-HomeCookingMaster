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
import useSearchText from "../hooks/Search/useSearchText"
import MainSearch from "../components/Main/MainSearch";
import MainRanking from "../components/Main/MainRanking";
import kkokko1 from "../../public/assets/kkokko_1.png";
import kkokko2 from "../../public/assets/kkokko_2.png";
import kkokko3 from "../../public/assets/kkokko_3.png";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";


const Page = () => {
  const {data} = useRankings();
  console.log(data);
  console.log(typeof data);
  const [text, setText] = useState("");

  const { data: session, status } = useSession();
  // const loading = status === "loading";
  const router = useRouter();

  const handleSignin = (e: any): void => {
    e.preventDefault();
    signIn();
  };
  const handleSignout = (e: any): void => {
    e.preventDefault();
    signOut();
  };

  const handleText = (e: any): void => {
    setText(e.target.value);
  }

  const handleClick = (e: any): void => {
    router.push(`/search/str?data=${text}`)
  };

  return (
    <>
      <label>
        <input onChange={(e) => handleText(e)} onKeyDown={(e) => {if (e.keyCode == 13) {handleClick(e);}}}></input>
        <button onClick={(e) => handleClick(e)}></button>
      </label>
      <MainSearch />
      <MainRanking ranking={data} />
    </>
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
  await queryClient.prefetchQuery("rankings", useRankings);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Page;

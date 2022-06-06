import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
// import SearchedImage from "../../hooks/Search/searchedImage";
import SearchedImage from "../../components/Main/DropZone";

import { useRecoilValue } from "recoil";
import { searchedImage } from "../../atom/searchedImage";

import {
  dehydrate,
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import useSearchImg from "../../hooks/Search/useSearchImg";
import { useSession } from "next-auth/react";
import DropZone from "../../components/Main/DropZone";
import SearchBar from "../../components/Common/SearchBar";
import TextCard from "../../components/Result/TextCard";
import loading from "../../../public/assets/loading1.gif";
import Image from "next/image";

const Img = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { sbi: random_path } = router.query;
  const PushToResult = () => {
    router.push(`/search/str?data=${data?.data.equal_rate[0].name}`);
  };
  const image = useRecoilValue(searchedImage);
  const preview = URL.createObjectURL(image);
  const formData = new FormData();
  console.log(image);
  formData.append("img", image);
  const { isLoading, data } = useSearchImg(formData, random_path);
  console.log(data);
  const isValidResult = data?.data.equal_rate[0].rate > 0.7;
  console.log(isValidResult);
  if (isValidResult) {
    PushToResult();
  }

  if (isLoading) {
    return (
      <div style={{ height: "100vh", width: "100vw", backgroundColor: "#ffffff" }}>
        <Image src={loading} style={{margin: "0 auto"}} />
      </div>
    )
  }

  return (
    <>
      {(!isValidResult && !isLoading) && (
        <>
          <img src={preview} />
          <p>
            최적의 검색결과를 얻지 못했습니다. 혹시 다음 중에 찾으시는 결과가
            있으신가요?
          </p>
          {data?.data.equal_rate?.map((item) => (
            <TextCard data={item.name} />
          ))}
          <p>다시 검색하기</p>
          <SearchBar />
          <DropZone />
        </>
      )}
    </>
  );
};

const getServerSideProps: GetServerSideProps = async (context) => {
  const { sbi: random_path } = context.query;
  const image = useRecoilValue(searchedImage);
  const formData = new FormData();
  formData.append("img", image);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["searchimg", formData, random_path], () =>
    useSearchImg(formData, random_path)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Img;

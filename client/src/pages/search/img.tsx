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

const Img = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const image = useRecoilValue(searchedImage);
  const preview = URL.createObjectURL(image);
  const formData = new FormData();
  formData.append("img", image);
  const { data } = useSearchImg(formData);
  console.log(data);
  const isValidResult = data?.data.equal_rate[0].rate > 0.7;
  const PushToResult = () => {
    router.push(`/search/str?data=${data?.data.equal_rate[0].name}`);
  }
  console.log(isValidResult);
  if (isValidResult) {
    PushToResult();
  }

  return (
    <>
      <img src={preview} />
      <p>최적의 검색결과를 얻지 못했습니다. 혹시 다음 중에 찾으시는 결과가 있으신가요?</p>
      {data?.data.equal_rate?.map((item) => (
        <Link href={`/search/str?data=${item.name}`}>
          <a>{item.name}</a>
        </Link>
      ))}
      <p>다시 검색하기</p>
      <SearchBar />
      <DropZone />
    </>
  );
};

const getServerSideProps: GetServerSideProps = async (context) => {
  const { data: food_name } = context.query;
  const image = useRecoilValue(searchedImage);
  const formData = new FormData();
  formData.append("img", image);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["searchimg", formData], () =>
    useSearchImg(formData)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Img;

import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
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
import TextCard from "../../components/Result/TextCard";
import LoadingScreen from "../../components/Common/LoadingScreen";

const Img = () => {
  const router = useRouter();
  const { sbi: random_path } = router.query;
  const PushToResult = () => {
    router.push(`/result/str?data=${data?.data.equal_rate[0].name}`);
  };
  const image = useRecoilValue(searchedImage);
  const formData = new FormData();
  formData.append("img", image);
  const preview = URL.createObjectURL(image) || null;
  
  const { data, error, isLoading } = useSearchImg(formData, random_path);
  console.log(data);
  const isValidResult = data?.data.equal_rate[0].rate > 0.7;
  console.log(isValidResult);
  
  if (isValidResult) {
    PushToResult();
  }

  if (isLoading) {
    return (
      <LoadingScreen />
    )
  }

  if (error) {
    alert(error.message);
    router.push("/");
  }

  return (
    <>
      {!isValidResult && (
        <>
          {preview && <img src={preview} />}
          <p>
            최적의 검색결과를 얻지 못했습니다. 혹시 다음 중에 찾으시는 결과가
            있으신가요?
          </p>
          {data?.data.equal_rate?.map((item) => (
            <TextCard data={item.name} />
          ))}
          <p>다시 검색하기</p>
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

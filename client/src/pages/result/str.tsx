import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  dehydrate,
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import useSearchStr from "../../hooks/Search/useSearchStr";
import ItemList from "../../components/Result/ItemList";
import TextCard from "../../components/Result/TextCard";

const Str = () => {
  const router = useRouter();
  const { data: food_name } = router.query;
  const { data } = useSearchStr(food_name);
  console.log(data);
  const isNoResult = data?.data.food_list.length === 0;
  const isMultiResult = data?.data.food_list.length > 1;
  console.log(isNoResult, isMultiResult);

  if (isMultiResult) {
    return data?.data.food_list.map((item) => (
      <TextCard data={item} />
    ));
  }

  if (isNoResult) {
    return <a>검색 결과가 없습니다.</a>
  }

  return (
    <ItemList data={data?.data} />
  );
};

const getServerSideProps: GetServerSideProps = async (context) => {
  const { data: food_name } = context.query;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["searchstr", food_name], () =>
    useSearchStr(food_name)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Str;

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
import useSearchImage from "../../hooks/Search/useSearchImage";
import useSearchText from "../../hooks/Search/useSearchText";
import { useSession } from "next-auth/react";

const Img = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const image = useRecoilValue(searchedImage);
  const preview = URL.createObjectURL(image);
  const formData = new FormData();
  formData.append("img", image);
  const { data } = useSearchImage(formData);
  console.log(data);  
  const { equal_rate, food_0, food_1, food_2 } = data?.data || {};

  // console.log(equal_rate, food_0, food_1, food_2);

  return (
    <>
      <img src={preview} />
      {food_0?.map((item: any) => (
        <>
          <p>{item.name}</p>
          <Link
            href={{
              pathname: "/recipe/[recipe_id]",
              query: { recipe_id: item.id },
            }}
          >
            <img src={item.img} width="200" height="100" alt={item.name}></img>
          </Link>
        </>
      ))}
    </>
  );
};

const getServerSideProps: GetServerSideProps = async (context) => {
  const { data: food_name } = context.query;
  const image = useRecoilValue(searchedImage);
  const formData = new FormData();
  formData.append("img", image);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["searchimage", formData], () =>
    useSearchImage(formData)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Img;

import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Link } from "next/link";
import {
  dehydrate,
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { useSession } from "next-auth/react";

const Search = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const {result} = router.query;
  // const { data } = useQuery(["recipe", recipe_id], () =>
  //   fetchRecipe(recipe_id)
  // );
  const {
    equal_rate,
    food_0,
    food_1,
    food_2,
  } = result || {};

  console.log(equal_rate, food_0, food_1, food_2);

  return (
    // <>
    //   {food_0?.map((item: any) => (
    //     <>
    //       <p>{item.name}</p>
    //       {/* <Link
    //         href={`/recipe/[recipe_id]?recipe_id=${encodeURIComponent(item.id)}`} as ={`/recipe/${encodeURIComponent(item.id)}`}
    //       >
    //         <img src={item.img} width="200" height="100" alt={item.name}></img>
    //       </Link> */}
    //       <Link
    //         href={{
    //           pathname: "/recipe/[recipe_id]",
    //           query: { recipe_id: item.id },
    //         }}
    //       >
    //         <img src={item.img} width="200" height="100" alt={item.name}></img>
    //       </Link>
    //     </>
    //   ))}
    // </>
    <></>
  );
};

const getServerSideProps: GetServerSideProps = async (context) => {
  const { recipe_id } = context.query;
  const queryClient = new QueryClient();
  // await queryClient.prefetchQuery(["recipe", recipe_id], () =>
  //   fetchRecipe(recipe_id)
  // );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Search;

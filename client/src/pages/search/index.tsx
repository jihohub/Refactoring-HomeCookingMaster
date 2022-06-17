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
import SearchBar from "../../components/Common/SearchBar";
import useSearchImage from "../../hooks/Search/useSearchImg";
import useSearchStr from "../../hooks/Search/useSearchStr";
import ItemList from "../../components/Result/ItemList";

const Page = () => {
  return (
    <SearchBar />
  );
};

export default Page;

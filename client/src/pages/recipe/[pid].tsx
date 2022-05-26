import React from "react";
import { useRouter } from "next/router";

const Recipe = () => {
  const router = useRouter();
  const { pid } = router.query;

  return (
    <p>{pid}</p>
  )
};

export default Recipe;

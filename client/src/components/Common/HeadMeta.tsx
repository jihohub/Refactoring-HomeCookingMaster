import React from "react";
import Head from "next/head";
import finalLogo from "../../../public/assets/finalLogo.png";

type HeadElements = {
  title?: string | undefined;
  description?: string | undefined;
  url?: string | undefined;
  image?: string | undefined;
  children?: JSX.Element | JSX.Element[];
};

const HeadMeta = ({ title, description, url, image }: HeadElements) => {
  return (
    <Head>
      <title>{title || "집밥꼬꼬선생"}</title>
      <meta
        name="description"
        content={
          description ||
          "음식 사진을 찍어 간편하게 레시피를 찾아볼 수 있는 집밥꼬꼬선생"
        }
      />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta property="og:title" content={title || "집밥꼬꼬선생"} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url || "http://www.hcmk.com"} />
      <meta property="og:image" content={image || finalLogo} />
      <meta property="og:article:author" content="집밥꼬꼬선생" />
    </Head>
  );
};

export default HeadMeta;

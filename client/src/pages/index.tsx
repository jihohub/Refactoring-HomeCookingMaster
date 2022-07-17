import React from "react";
import Image from "next/image";
import styles from "./index.module.scss";
import main from "../../public/assets/main.png";
import HeadMeta from "../components/Common/HeadMeta";

const IndexPage = () => {
  return (
    <>
      <HeadMeta />
      <div className={styles.background}>
        <div className={styles.overlay}>
          <h1>이젠 집에서 해드세요.</h1>
          <h2>집밥꼬꼬선생이 있습니다.</h2>
        </div>
        <Image
          src={main}
          alt="background image"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          placeholder="blur"
        />
      </div>
    </>
  );
};

export default IndexPage;

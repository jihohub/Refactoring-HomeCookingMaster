import React from "react";
import { useRouter } from "next/router";
import styles from "./TextCard.module.scss"

function TextCard(props: any) {
  const router = useRouter();
  const handleClick = (): void => {
    router.push(`/result/str?data=${props.data}`);
  };

  return (
    <div onClick={handleClick} className={styles.box}>
      <p className={styles.text}>{props.data}</p>
    </div>
  );
}

export default TextCard;

import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./ItemCard.module.scss";

function ItemCard(props: any) {
  const router = useRouter();
  console.log(props);
  const { cooking_time, difficulty, food_id, id, img, likes, name, servings, views } = props?.data || {};
  const handleClick = (): void => {
    router.push(`/recipe/${id}`);
  };

  return (
    <div onClick={handleClick} className={styles.wrap}>
      <img src={img} className={styles.image} />
      <div className={styles.panel}>
        <div className={styles.title}>
          <p className={styles.title__text}>{name}</p>
        </div>
        <div className={styles.description}>
          <p className={styles.description__text}>좋아요 : {likes}</p>
          <p className={styles.description__text}>조회수 : {views}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;

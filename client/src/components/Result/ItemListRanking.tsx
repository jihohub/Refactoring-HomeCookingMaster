import React from 'react';
import ItemCard from "./ItemCard";
import styles from "./ItemListRanking.module.scss";

function ItemListResult(props: any) {
  console.log(props?.data.data);
  const recipes = props?.data.data || [];

  return (
    <div className={styles.wrap}>
      {recipes.map((item) => (
        <ItemCard data={item} />
      ))}
    </div>
  )
}

export default ItemListResult;

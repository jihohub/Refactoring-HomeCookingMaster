import React from 'react';
import ItemCard from "./ItemCard";
import styles from "./ItemListResult.module.scss";

function ItemListResult(props: any) {
  const recipes = props?.data?.food_0 || [];

  return (
    <div className={styles.wrap}>
      {recipes.map((item) => (
        <ItemCard data={item} />
      ))}
    </div>
  );
}

export default ItemListResult;

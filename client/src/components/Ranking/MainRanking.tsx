import React from "react";
import styles from "./MainRanking.module.scss";
import ItemListRanking from "../Result/ItemListRanking";

const MainRanking = (props: any) => {
  return (
    <ItemListRanking data={props.data} />
  )
}

export default MainRanking;

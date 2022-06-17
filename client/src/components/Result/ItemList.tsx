import React, { useEffect, useState } from 'react';
import Link from "next/link";
import queryString from 'query-string';
import { useRouter } from "next/router";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { MdPersonSearch } from "react-icons/md";
import { imgResult, itemsTitle } from '../../css/result_csst';
import ItemCard from "./ItemCard";
import styles from "./ItemList.module.scss";

function ItemList(props: any) {
  console.log(props?.data?.food_0);
  const recipes = props?.data?.food_0 || [];

  return (
    <div className={styles.wrap}>
      {recipes.map((item) => (
        <ItemCard data={item} />
      ))}
    </div>
  );
}

export default ItemList;

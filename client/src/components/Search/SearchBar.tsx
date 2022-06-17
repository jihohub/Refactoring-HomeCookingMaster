import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import styles from "./SearchBar.module.scss";
import finalLogo from "../../../public/assets/finallogo.png"

const SearchBar = () => {
  const router = useRouter();
  const [text, setText] = useState("");

  const handleText = (e: any): void => {
    setText(e.target.value);
  };

  const handleClick = (e: any): void => {
    router.push(`/result/str?data=${text}`);
  };

  return (
    <div className={styles.root}>
      <Link href="/">
        <Image src={finalLogo} alt="main_logo" width="200%" height="100%" />
      </Link>
      <label className={styles.searchbar__wrap}>
        <input
          onChange={(e) => handleText(e)}
          onKeyDown={(e) => {
            if (e.keyCode == 13) {
              handleClick(e);
            }
          }}
          className={styles.loginform__input}
        ></input>
        <button onClick={(e) => handleClick(e)} className={styles.loginform__button}>검색</button>
      </label>
    </div>
  );
};

export default SearchBar;

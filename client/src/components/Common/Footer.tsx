import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image"
import { Box, Typography } from "@mui/material";
import avatar from "../../../public/assets/avatar.png";
import { styled } from "@mui/material/styles";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <a>Copyright 2022. 집밥꼬꼬선생 All right reserved.</a>
      <Link href="https://github.com/jihohub/Refactoring-HomeCookingMaster">
        <a>
          GitHub
        </a>
      </Link>
    </div>
  );
};

export default Footer;

const Foot = styled(Typography)({
  fontFamily: "Elice",
  marginLeft: 10,
  marginRight: 10,
  cursor: "pointer",
  "&:hover": {
    color: "white",
  },
});

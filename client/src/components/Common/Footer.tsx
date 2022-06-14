import React, { useState } from "react";
import Image from "next/image"
import { Box, Typography } from "@mui/material";
import avatar from "../../../public/assets/avatar.png";
import { styled } from "@mui/material/styles";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <p>Copyright 2022. 집밥꼬꼬선생 All right reserved.</p>
      <a target="_blank" href="https://github.com/jihohub/Refactoring-HomeCookingMaster" className={styles.link}>GitHub</a>
    </div>
  );
};

export default Footer;

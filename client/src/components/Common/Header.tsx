import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import logohat from "../../../public/assets/hatYess.png";
import axios from "axios";
import CssBaseline from "@mui/material/CssBaseline";
import styles from "./Header.module.scss";
// import { setUser } from "../../modules/userLogin";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import background from "../../../public/assets/bg2.jpeg";
import finalLogo from "../../../public/assets/finalLogo.png";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { loginInfo } from "../../atom/loginInfo";
import useLogout from "../../hooks/Auth/useLogout";

// const styles = {
//   "&.MuiFab-secondary": {
//     backgroundColor: "#897A5F",
//   },
// };

const pages = [
  {
    text: "텍스트검색",
    path: "/result",
  },
  {
    text: "어바웃",
    path: "/about",
  },
];

const notLoggedIn = [
  {
    text: "회원가입",
    path: "register/termsNConditions",
  },
  {
    text: "로그인",
    path: "/login",
  },
];

const Header = () => {
  const router = useRouter();
  const loggedin = useRecoilValue(loginInfo);
  const resetLoggedin = useResetRecoilState(loginInfo);
  const isLoggedIn = loggedin.refresh_token;
  const { mutate: logout, isLoading: logoutLoading } = useLogout();

  const [open, setOpen] = useState(false);

  const [isActive, setActive] = useState(false);
  const handleToggle = () => {
    setActive(!isActive);
  };


  const handleClick = () => {
    setOpen(!open);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  const handleSignout = (e: any): void => {
    const access_token = loggedin.access_token;
    e.preventDefault();
    logout(access_token);
    resetLoggedin();
    router.push("/");
  };

  return (
    <nav className={styles.navbar}>
      <div className="navbar__logo">
        <Link href="/">
          <Image src={finalLogo} alt="main_logo" height="50%" width="100%" />
        </Link>
      </div>
      <ul
        className={
          isActive ? styles["navbar__menu--active"] : styles.navbar__menu
        }
      >
        <li>
          <Link href="/">홈</Link>
        </li>
        <li>
          <Link href="/about">어바웃</Link>
        </li>
        <li>
          <Link href="/mypage">마이페이지</Link>
        </li>
      </ul>
      <ul
        className={
          isActive ? styles["navbar__auth--active"] : styles.navbar__auth
        }
      >
        {isLoggedIn ? (
          <>
            <li>
              <p onClick={handleSignout}>로그아웃</p>
            </li>
            <li>
              <p>{loggedin.nickname}</p>
            </li>
            <li>
              {loggedin.img && <img src={loggedin.img} alt="user profile image" />}
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/login">
                <a>로그인</a>
              </Link>
            </li>
            <li>
              <Link href="/register">
                <a>회원가입</a>
              </Link>
            </li>
          </>
        )}
      </ul>
      <a onClick={handleToggle} className={styles.navbar__toggleBtn}>
        <MenuIcon />
      </a>
    </nav>
  );
};

export default Header;

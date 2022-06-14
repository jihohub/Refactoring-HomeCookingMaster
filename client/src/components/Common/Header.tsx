import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import logohat from "../../../public/assets/hatYess.png";
import axios from "axios";
import CssBaseline from "@mui/material/CssBaseline";
import styles from "./Header.module.css";
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

  const handleSignin = (e: any): void => {
    e.preventDefault();
    router.push("/login");
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
          <Image src={finalLogo} alt="mainlogo" height="50%" width="100%" />
        </Link>
      </div>
      {/* <ul className={styles.navbar__menu}> */}
      <ul className={(isActive) ? styles["navbar__menu--active"] : styles.navbar__menu}>
        <li className={styles.nav__item}>
          <Link href="/" className={styles.nav__link}>
            Home
          </Link>
        </li>
        <li className={styles.nav__item}>
          <Link href="/about" className={styles.nav__link}>
            About
          </Link>
        </li>
        <li className={styles.nav__item}>
          <Link href="/mypage" className={styles.nav__link}>
            My Page
          </Link>
        </li>
      </ul>
      <ul className={(isActive) ? styles["navbar__auth--active"] : styles.navbar__auth}>
        {isLoggedIn ? (
          <li className={styles.navigation__auth}>
            <a className={styles.navigation__item} onClick={handleSignout}>
              로그아웃
            </a>
            <p className={styles.navigation__item}>{loggedin.nickname}</p>
            <img
              className={styles.nav__userimage}
              src={loggedin.img}
              alt="user profile image"
            />
          </li>
        ) : (
          <li className={styles.navigation__auth}>
            <a onClick={handleSignin}>로그인</a>
          </li>
        )}
      </ul>
      <a onClick={handleToggle} className={styles.navbar__toggleBtn}>
        <MenuIcon />
      </a>
    </nav>
    // <nav className={styles.navbar}>
    //   <Link href="/" className={styles.nav__logo}>
    //     <Image src={finalLogo} alt="mainlogo" height="50%" width="100%" />
    //   </Link>
    //   <div onClick={handleClick} className={styles.nav__icon}>
    //     {/* {open ? <FiX /> : <FiMenu />} */}
    //   </div>
    //   <ul className={styles.nav__links}>
    //     <li className={styles.nav__item}>
    //       <Link href="/" className={styles.nav__link}>
    //         Home
    //       </Link>
    //     </li>
    //     <li className={styles.nav__item}>
    //       <Link href="/about" className={styles.nav__link}>
    //         About
    //       </Link>
    //     </li>
    //     <li className={styles.nav__item}>
    //       <Link href="/mypage" className={styles.nav__link}>
    //         My Page
    //       </Link>
    //     </li>
    // {isLoggedIn ? (
    //   <div className={styles.navigation__auth}>
    //     <a className={styles.navigation__item} onClick={handleSignout}>
    //       로그아웃
    //     </a>
    //     <p className={styles.navigation__item}>{loggedin.nickname}</p>
    //     <img
    //       className={styles.nav__userimage}
    //       src={loggedin.img}
    //       alt="user profile image"
    //     />
    //   </div>
    // ) : (
    //   <div className={styles.navigation__auth}>
    //     <a onClick={handleSignin}>로그인</a>
    //   </div>
    // )}
    //   </ul>
    // </nav>
  );
};

export default Header;

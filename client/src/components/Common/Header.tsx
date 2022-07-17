import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "./Header.module.scss";
import MenuIcon from "@mui/icons-material/Menu";
import finalLogo from "../../../public/assets/finalLogo.png";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { loginInfo } from "../../atom/loginInfo";
import useLogout from "../../hooks/Auth/useLogout";

const Header = () => {
  const router = useRouter();
  const loggedin = useRecoilValue(loginInfo);
  const resetLoggedin = useResetRecoilState(loginInfo);
  const isLoggedIn = loggedin.refresh_token;
  const { mutate: logout, isLoading: logoutLoading } = useLogout();

  const [isActive, setActive] = useState(false);
  const handleToggle = () => {
    setActive(!isActive);
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
          <Image src={finalLogo} alt="main_logo" height={50} width={100} />
        </Link>
      </div>
      <ul
        className={
          isActive ? styles["navbar__menu--active"] : styles.navbar__menu
        }
      >
        <li>
          <Link href="/search/img">
            <a>이미지로 검색</a>
          </Link>
        </li>
        <li>
          <Link href="/search/str">
            <a>텍스트로 검색</a>
          </Link>
        </li>
        <li>
          <Link href="/ranking">
            <a>오늘의 레시피 랭킹</a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a>서비스 소개</a>
          </Link>
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
              <Link href="/mypage">
                <a>마이페이지</a>
              </Link>
            </li>
            <li>
              <a onClick={handleSignout}>로그아웃</a>
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

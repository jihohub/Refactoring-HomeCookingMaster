import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import logohat from "../../../public/assets/hatYess.png";
import axios from "axios";
import CssBaseline from "@mui/material/CssBaseline";
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

const styles = {
  "&.MuiFab-secondary": {
    backgroundColor: "#897A5F",
  },
};

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
// interface Props {
//   window?: () => Window;
//   children: React.ReactElement;
// }

const Header = () => {
  const { data: session, status } = useSession();

  // useEffect(() => {
  //   if (session?.error === "RefreshAccessTokenError") {
  //     signIn(); // Force sign in to hopefully resolve error
  //   }
  // }, [session]);

  // const router = useRouter();
  console.log("status:", status);
  console.log("session:", session);


  const handleSignin = (e: any): void => {
    e.preventDefault();
    signIn();
  };
  const handleSignout = (e: any): void => {
    e.preventDefault();
    signOut();
  };

  if (session) {
    return (
      <>
        Signed in as <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
};

export default Header;

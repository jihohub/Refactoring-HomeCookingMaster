import React, { useState } from "react";
import Link from "next/link";
import { Box, Typography } from "@mui/material";
import avatar from "../../../public/assets/avatar.png";
import { styled } from "@mui/material/styles";

const Footer = () => {
  return (
    <Box
      sx={{
        height: "6rem",
        backgroundColor: "#b4a58a",
        display: "flex",
        alignItems: "center",
      }}
    >
      <img
        src={avatar}
        style={{
          height: "4rem",
          cursor: "pointer",
          margin: "20px",
        }}
        alt="main avatar"
      />
      <Typography sx={{ fontFamily: "EliceBold", marginRight: "5px" }}>
        {"@집밥꼬꼬선생 "}
      </Typography>
      <Foot>
        <Link href="/about">
          <a>서비스 소개</a>
        </Link>
      </Foot>
      <Typography sx={{ fontFamily: "Elice" }}>{" ᛫ "}</Typography>
      <Foot>
        <Link href="/introUs">
          <a>팀원 소개</a>
        </Link>
      </Foot>
      <Typography sx={{ fontFamily: "Elice" }}>{" ᛫ "}</Typography>
      <Foot>
        <Link href="/register/termsNConditions">
          <a>이용 약관</a>
        </Link>
      </Foot>
      <Typography sx={{ fontFamily: "Elice" }}>{" ᛫ "}</Typography>
      <Foot>
        <Link href="https://kdt-gitlab.elice.io/002-part3-cnn/team5/project-template">
          <a>GitLab</a>
        </Link>
      </Foot>
    </Box>
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

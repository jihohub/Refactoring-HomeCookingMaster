import React, { useState } from "react";
import Image from "next/image"
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import {
  aboutDiv,
  sectionImg,
  sectionOne,
  sectionTwo,
} from "../css/about_css";
import { Fade } from "react-awesome-reveal";
import avatar from "../../public/assets/avatar.png";
import logo from "../../public/assets/hcmk_logo.png";
import ex11 from "../../public/assets/ex11.png";
import ex12 from "../../public/assets/ex12.png";
import ex13 from "../../public/assets/ex13.png";
import review from "../../public/assets/newReview.jpg";
import mypage from "../../public/assets/mypage.png";
import { SearchDiv } from "../css/about_css";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import scroll from "../../../public/assets/scroll.png";
import { IoIosArrowDown } from "react-icons/io";

function AboutPage() {
  const router = useRouter();
  return (
    <div css={aboutDiv}>
      <section css={sectionImg}>
        <h1 style={{ marginTop: "5%", fontWeight: "600", fontSize: "4rem" }}>
          집밥꼬꼬선생
        </h1>
        <p>집밥 레시피 검색 플랫폼</p>
        <p
          style={{
            fontSize: "1.3rem",
            color: "#fdfcf7",
            fontWeight: "600",
            paddingTop: "2%",
          }}
        >
          스크롤을 내려보세요.
        </p>
        <IoIosArrowDown size="60" />
      </section>
      <section css={sectionOne}>
        <Fade>
          <Image src={logo} alt="logo" width="400"></Image>
          <p>
            AI 이미지 처리 기능을 활용해
            <br /> 이미지로 집밥 레시피를 검색할 수 있는 웹 서비스
          </p>
          <h1 style={{ fontWeight: "600", marginTop: "2rem" }}>
            AI 기술을 활용한 이미지 검색
          </h1>
          <p>
            먹고 싶은 음식 사진을 발견해 <br />
            당장 만들어 먹고싶다면 <br />
            집밥꼬꼬선생을 이용하여 사진으로 레시피를 검색하세요!
          </p>
        </Fade>
      </section>
      <section css={sectionOne}>
        <Fade>
          <Image
            src={avatar}
            alt="avatar"
            style={{ marginTop: "2rem" }}
          ></Image>
          <h2 style={{ fontFamily: "EliceBold" }}>왜 집밥 꼬꼬 선생인가요?</h2>
          <p>
            요리에 서툰 사회 초년생을 병아리에 비유하여
            <br /> 꼬꼬 선생이 이들에게 레시피를 전달해주는 서비스입니다.
          </p>
        </Fade>
      </section>
      <section css={sectionTwo}>
        <Fade>
          <SearchDiv>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginRight: "2.5%",
                marginTop: "5rem",
              }}
            >
              <h1 style={{ fontFamily: "EliceBold" }}>
                다양한 음식 레시피 보유
              </h1>
              <p>
                총 400가지의 집밥 메뉴와 <br />약 1900개의 레시피 데이터를
                보유하고 있어 <br />
                다양한 음식을 만들 수 있습니다.
              </p>
            </div>
            <Box sx={{ width: 500, height: 450, marginLeft: "8%" }}>
              <ImageList variant="masonry" cols={3} gap={8}>
                <ImageListItem key={ex11}>
                  <Image
                    src={ex11}
                    alt="ex11"
                    loading="lazy"
                    style={{
                      height: "15rem",
                      width: "15rem",
                      borderRadius: "15px",
                      boxShadow: "2px 2px 6px gray",
                    }}
                  />
                </ImageListItem>
                <ImageListItem key={ex12}>
                  <Image
                    src={ex12}
                    alt="ex12"
                    loading="lazy"
                    style={{
                      height: "15rem",
                      width: "15rem",
                      borderRadius: "15px",
                      boxShadow: "2px 2px 6px gray",
                    }}
                  />
                </ImageListItem>
                <ImageListItem key={ex13}>
                  <Image
                    src={ex13}
                    alt="ex13"
                    loading="lazy"
                    style={{
                      height: "20rem",
                      width: "15rem",
                      marginLeft: "5rem",
                      marginTop: "3rem",
                      borderRadius: "15px",
                      boxShadow: "2px 2px 6px gray",
                    }}
                  />
                </ImageListItem>
              </ImageList>
            </Box>
          </SearchDiv>
        </Fade>
      </section>
      <section css={sectionOne}>
        <Fade>
          <SearchDiv>
            <Image
              src={review}
              alt="review"
              style={{
                height: "30rem",
                width: "30rem",
                marginRight: "2.5%",
                borderRadius: "15px",
                boxShadow: "2px 2px 6px gray",
                marginLeft: "8%",
              }}
            ></Image>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "5rem",
                marginLeft: "2.5%",
                width: "100%",
              }}
            >
              <h1 style={{ fontFamily: "EliceBold" }}>
                사용자들의 생생한 리뷰
              </h1>
              <p>레시피만으로는 알 수 없는 후기와 꿀팁 공유</p>
            </div>
          </SearchDiv>
        </Fade>
      </section>
      <section css={sectionOne}>
        <Fade>
          <SearchDiv>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "5rem",
                width: "100%",
                marginRight: "1.5%",
              }}
            >
              <h1 style={{ fontFamily: "EliceBold" }}>
                마이페이지를 활용한 리뷰 및<br /> 스크랩 레시피 관리
              </h1>
              <p>
                스크랩한 레시피와 댓글을 단<br /> 레시피를 마이페이지에서 손
                쉽게 확인할 수 있습니다.
              </p>
            </div>
            <Image
              src={mypage}
              alt="mypage"
              style={{
                height: "30rem",
                width: "30rem",
                borderRadius: "15px",
                boxShadow: "2px 2px 6px gray",
                marginLeft: "8%",
              }}
            ></Image>
          </SearchDiv>
        </Fade>
      </section>
    </div>
  );
}

export default AboutPage;

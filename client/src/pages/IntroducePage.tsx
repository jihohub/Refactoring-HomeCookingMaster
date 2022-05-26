import React, { useState } from "react";
import { aboutDiv, Avatar, name, position, each } from "../css/intro_css";
import tiger from "../../public/assets/tiger.png";
import bear from "../../public/assets/bear.png";
import robot from "../../public/assets/robot.png";
import rabbit from "../../public/assets/rabbit.png";
import cat from "../../public/assets/cat.png";
import dog from "../../public/assets/dog.png";

function IntroPage() {
  return (
    <div css={aboutDiv}>
      <div>
        <p
          style={{
            fontFamily: "EliceBold",
            color: "#897A5F",
            paddingBottom: "10%",
            fontSize: "3rem",
          }}
        >
          집밥꼬꼬선생
          <br />
          개발자들을 소개합니다.
        </p>
      </div>
      <div css={each}>
        <Avatar src={tiger} alt="tiger"></Avatar>
        <div
          style={{ display: "flex", flexDirection: "column", marginLeft: "2%" }}
        >
          <p css={name}>김한별 (리더)</p>
          <p css={position}>백엔드 담당</p>
          <p>- 학습, 결과 데이터 전처리</p>
          <p>- 결과 데이터 웹 크롤링</p>
          <p>- Docker 개발 환경, 배포 환경 세팅</p>
          <p>- API 구현 및 DB 설계</p>
          <p>- JWT 이용한 인증 관리 구현</p>
          <p>- 인공지능 서버 구축</p>
        </div>
      </div>
      <div css={each}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginRight: "2%",
          }}
        >
          <p css={name}>김희재</p>
          <p css={position}>백엔드 담당</p>
          <p>- 페이지 별 API 구상</p>
          <p>- API 구현 및 DB 설계</p>
          <p>- S3 이미지 업로드 및 삭제 기능 구현</p>
          <p>- 와이어 프레임 제작</p>
          <p>- 웹 페이지 디자인 구상</p>
        </div>
        <Avatar src={bear} alt="bear"></Avatar>
      </div>
      <div css={each}>
        <Avatar src={robot} alt="robot"></Avatar>
        <div
          style={{ display: "flex", flexDirection: "column", marginLeft: "2%" }}
        >
          <p css={name}>나석균</p>
          <p css={position}>인공지능 및 백엔드 담당</p>
          <p>- DB 설계</p>
          <p>- vm(linux) GPU 환경 설정</p>
          <p>- 이미지 classification 모델 선정, 학습, 테스트 진행</p>
          <p>- 머신러닝 API 및 class 구현</p>
          <p>- Docker 배포 환경 세팅</p>
        </div>
      </div>
      <div css={each}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginRight: "2%",
          }}
        >
          <p css={name}>남경민</p>
          <p css={position}>프론트엔드 담당</p>
          <p>- 와이어프레임 제작 </p>
          <p>- 로그인, 회원가입 기능 구현</p>
          <p>- 검색 결과 페이지 기능 구현</p>
          <p>- 페이지 설계 및 디자인 작업</p>
          <p>- 리덕스 상태관리 적용</p>
          <p>- access token 상태 확인 및 재발급 기능 구현</p>
        </div>
        <Avatar src={rabbit} alt="rabbit"></Avatar>
      </div>
      <div css={each}>
        <Avatar src={cat} alt="cat"></Avatar>
        <div
          style={{ display: "flex", flexDirection: "column", marginLeft: "2%" }}
        >
          <p css={name}>박지호</p>
          <p css={position}>프론트엔드 담당</p>
          <p>- 플로우차트 설계</p>
          <p>- 와이어프레임 제작</p>
          <p>- 상단 네비게이션바 구현</p>
          <p>- 메인 페이지 검색 기능, 랭킹 기능 구현</p>
          <p>- 레시피 페이지 구현</p>
          <p>- 리덕스 상태관리 적용</p>
          <p>- 반응형 페이지 구현</p>
        </div>
      </div>
      <div css={each}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginRight: "2%",
          }}
        >
          <p css={name}>조승희</p>
          <p css={position}>인공지능 담당</p>
          <p>- 이미지 classification 모델 선정, 학습, 테스트 진행</p>
          <p>- 입력 이미지 리사이징 코드 작성</p>
          <p>- 테스트 코드 작성</p>
          <p>- 데이터 셋 및 데이터 라벨 정리</p>
        </div>
        <Avatar src={dog} alt="dog"></Avatar>
      </div>
    </div>
  );
}

export default IntroPage;

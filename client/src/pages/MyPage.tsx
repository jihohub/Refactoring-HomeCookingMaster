import React, { useState } from "react";
import IntroMe from "../components/Mypage/IntroMe";
import MyPost from "../components/Mypage/myPost";
import MyScrap from "../components/Mypage/myScrap";
import useGetMypage from "../hooks/Mypage/useMypage";
import { useRecoilValue } from "recoil";
import { loginInfo } from "../atom/loginInfo";

function mypage() {
  const loggedin = useRecoilValue(loginInfo);
  const { data } = useGetMypage(loggedin.access_token);
  console.log(data?.data);
  const { user_info, liked_recipe, my_post } = data?.data || {};



  return (
    <div
      style={{
        marginTop: "10rem",
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        marginBottom: "10rem",
      }}
    >
      <div
        style={{ backgroundColor: "white", width: "70%", paddingTop: "5rem" }}
      >
        <IntroMe data={user_info} />
        <MyPost data={my_post} />
        <MyScrap data={liked_recipe} />
      </div>
    </div>
  );
}

export default mypage;

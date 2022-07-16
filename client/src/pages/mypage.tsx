import React from "react";
import { useRouter } from "next/router";
import IntroMe from "../components/Mypage/IntroMe";
import MyPost from "../components/Mypage/myPost";
import MyScrap from "../components/Mypage/myScrap";
import useGetMypage from "../hooks/Mypage/useMypage";
import { useRecoilValue } from "recoil";
import { loginInfo } from "../atom/loginInfo";
import HeadMeta from "../components/Common/HeadMeta";

function MyPage() {
  const router = useRouter();
  const loggedin = useRecoilValue(loginInfo);
  const isLoggedIn = loggedin.refresh_token !== null;

  if (!isLoggedIn) {
    router.push("/login");
  }

  const { data } = useGetMypage(loggedin.access_token);
  const { user_info, liked_recipe, my_post } = data?.data || {};

  return (
    isLoggedIn && (
      <>
        <HeadMeta
          title="마이페이지"
          url="http://www.hcmk.com/mypage"
        />
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
            style={{
              backgroundColor: "white",
              width: "70%",
              paddingTop: "5rem",
            }}
          >
            <IntroMe data={user_info} />
            <MyPost data={my_post} />
            <MyScrap data={liked_recipe} />
          </div>
        </div>
      </>
    )
  );
}

export default MyPage;

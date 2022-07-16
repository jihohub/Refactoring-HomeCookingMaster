import React from "react";
import LoginForm from "../components/Login/LoginForm";
import HeadMeta from "../components/Common/HeadMeta";

function LoginPage() {
  return (
    <>
      <HeadMeta title="로그인" url="http://www.hcmk.com/login" />
      <div style={{ width: "100vw", height: "100vh" }}>
        <LoginForm />
      </div>
    </>
  );
}

export default LoginPage;

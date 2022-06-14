import { Router } from "@mui/icons-material";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import useSignup from "../hooks/Auth/useSignup";
import useValidateEmail from "../hooks/Auth/useValidateEmail";
import useValidateNickname from "../hooks/Auth/useValidateNickname";
import { useRecoilValue } from "recoil";
import { registerInfo } from "../atom/registerInfo";



export default function App() {
  const registered = useRecoilValue(registerInfo);

  return (
    <>
      <p>{`${registered.nickname}님 가입이 완료되었습니다.`}</p>
    </>
  );
}

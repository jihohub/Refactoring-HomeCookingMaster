import React from "react";
import { useRecoilValue } from "recoil";
import { registerInfo } from "../atom/registerInfo";

export default function App() {
  const registered = useRecoilValue(registerInfo);

  return <p>{`${registered.nickname}님 가입이 완료되었습니다.`}</p>
}

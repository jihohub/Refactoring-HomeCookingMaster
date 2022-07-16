import React from "react";
import { useRecoilValue } from "recoil";
import { registerInfo } from "../atom/registerInfo";
import HeadMeta from "../components/Common/HeadMeta";

export default function App() {
  const registered = useRecoilValue(registerInfo);

  return (
    <>
      <HeadMeta
        title="회원가입완료"
        url="http://www.hcmk.com/complete"
      />
      <p>{`${registered.nickname}님 가입이 완료되었습니다.`}</p>
    </>
  )
}

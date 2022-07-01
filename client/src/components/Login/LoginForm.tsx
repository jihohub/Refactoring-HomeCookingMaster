import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { loign_box, input_box } from "../../css/login_css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import useLogin from "../../hooks/Auth/useLogin";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import Link from "next/link";
import finalLogo from "../../../public/assets/finalLogo.png";
import styles from "./LoginForm.module.scss";

const OkButton = styled(Button)({
  backgroundColor: "#897A5F",
  borderColor: "#897A5F",
  "&:hover": {
    backgroundColor: "#c7b595",
    borderColor: "#c7b595",
  },
});

function LoginForm() {
  const { mutate: login, isLoading: loginLoading } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => login(data);

  return (
    <div className={styles.root}>
      <Link href="/">
        <Image src={finalLogo} alt="main_logo" width="200%" height="100%" />
      </Link>
      <div className={styles.loginform__wrap}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.loginform}>
          <input
            type="text"
            placeholder="이메일주소"
            {...register("email")}
            className={styles.loginform__email}
          />

          <input
            type="password"
            placeholder="비밀번호"
            {...register("password", { required: true })}
            className={styles.loginform__password}
          />
          {/* {errors.exampleRequired && (
        <span css={styles.loginform__errormessage}>This field is required</span>
      )} */}

          <input
            type="submit"
            value="로그인"
            className={styles.loginform__button}
          />
        </form>
      </div>
      <div>
        <p className={styles.suggestion__text}>아직 회원이 아니신가요?</p>
        <Link href="/register">
          <a className={styles.suggestion__anchor}>회원가입하기</a>
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;

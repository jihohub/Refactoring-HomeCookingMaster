import React from "react";
import Image from "next/image";
import useLogin from "../../hooks/Auth/useLogin";
import { useForm } from "react-hook-form";
import Link from "next/link";
import finalLogo from "../../../public/assets/finalLogo.png";
import styles from "./LoginForm.module.scss";

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
            {...register("email", { required: "이메일은 필수입니다." })}
            className={styles.loginform__email}
          />
          {errors.email && (
            <p className={styles.loginform__error}>{errors.email.message}</p>
          )}
          <input
            type="password"
            placeholder="비밀번호"
            {...register("password", { required: "비밀번호는 필수입니다." })}
            className={styles.loginform__password}
          />
          {errors.password && (
            <p className={styles.loginform__error}>{errors.password.message}</p>
          )}

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

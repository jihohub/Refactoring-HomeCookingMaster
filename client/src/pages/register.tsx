import { Router } from "@mui/icons-material";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import useSignup from "../hooks/Auth/useSignup";
import useValidateEmail from "../hooks/Auth/useValidateEmail";
import useValidateNickname from "../hooks/Auth/useValidateNickname";
import styles from "./register.module.scss";
import finalLogo from "../../public/assets/finalLogo.png";
import HeadMeta from "../components/Common/HeadMeta";

const RegisterPage = () => {
  const { mutate: signup, isLoading: signupLoading } = useSignup();
  const { mutate: valEmail, isLoading: valEmailLoading } = useValidateEmail();
  const { mutate: valNickname, isLoading: valNicknameLoading } = useValidateNickname();
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm();

  const email = watch("email");
  const password = watch("password");
  const nickname = watch("nickname");
  const [previewImage, setPreviewImage] = useState<String | ArrayBuffer | null>(
    ""
  );
  const [profileImage, setProfileImage] = useState<Blob | null>(
    null
  );

  const onUploadImage = (e: any) => {
    let reader = new FileReader();
    setProfileImage(e.target.files[0]);
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("nickname", nickname);
    profileImage && formData.append("img", profileImage);
    signup(formData);
  };

  return (
    <>
      <HeadMeta
        title="회원가입"
        url="http://www.hcmk.com/register"
      />
      <div className={styles.root}>
        <Link href="/">
          <Image src={finalLogo} alt="main_logo" width="200%" height="100%" />
        </Link>
        <form className={styles.register} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.register__section}>
            <label className={styles.register__label}>이메일</label>
            <div className={styles.register__inputWithButton}>
              <input
                type="text"
                className={styles.register__input}
                {...register("email", {
                  required: "이메일은 필수입니다.",
                  pattern: {
                    value: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
                    message: "이메일 형식이 아닙니다.",
                  },
                })}
              />
              <button
                onClick={() => valEmail(email)}
                className={styles.register__button}
              >
                중복확인
              </button>
            </div>
          </div>
          <div className={styles.register__section}>
            {errors.email && (
              <p className={styles.register__error}>{errors.email.message}</p>
            )}
          </div>
          <div className={styles.register__section}>
            <label className={styles.register__label}>비밀번호</label>
            <input
              type="password"
              className={styles.register__input}
              {...register("password", {
                required: "비밀번호는 필수입니다.",
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/i,
                  message: "숫자/영문자 조합으로 8~16자로 입력해주세요.",
                },
              })}
            />
          </div>
          <div className={styles.register__section}>
            {errors.password && (
              <p className={styles.register__error}>
                {errors.password.message}
              </p>
            )}
          </div>
          <div className={styles.register__section}>
            <label className={styles.register__label}>비밀번호 확인</label>
            <input
              type="password"
              className={styles.register__input}
              {...register("confirm_password", {
                required: "비밀번호 확인은 필수입니다.",
                validate: (value) => {
                  return (
                    value === getValues("password") ||
                    "비밀번호가 일치하지 않습니다."
                  );
                },
              })}
            />
          </div>
          <div className={styles.register__section}>
            {errors.confirm_password && (
              <p className={styles.register__error}>
                {errors.confirm_password.message}
              </p>
            )}
          </div>
          <div className={styles.register__section}>
            <label className={styles.register__label}>닉네임</label>
            <div className={styles.register__inputWithButton}>
              <input
                type="nickname"
                className={styles.register__input}
                {...register("nickname", {
                  required: "닉네임은 필수입니다.",
                  maxLength: {
                    value: 10,
                    message: "닉네임은 10자 이하로 설정해주세요.",
                  },
                })}
              />
              <button
                onClick={() => valNickname(nickname)}
                className={styles.register__button}
              >
                중복확인
              </button>
            </div>
          </div>
          <div className={styles.register__section}>
            {errors.nickname && (
              <p className={styles.register__error}>
                {errors.nickname.message}
              </p>
            )}
          </div>
          <div className={styles.register__section}>
            <label className={styles.register__label}>프로필 사진</label>
            <input
              type="file"
              accept="image/png, image/jpeg"
              className={styles.root}
              onChange={(e) => onUploadImage(e)}
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="profile image"
                className={styles.register__image}
              />
            )}
          </div>
          <div className={styles.register__section}>
            <input
              type="submit"
              value="가입하기"
              onClick={handleSubmit(onSubmit)}
              className={styles.register__submitButton}
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default RegisterPage;

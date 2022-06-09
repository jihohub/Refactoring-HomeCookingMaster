import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import useSignup from "../hooks/Auth/useSignup";
import useValidateEmail from "../hooks/Auth/useValidateEmail";
import useValidateNickname from "../hooks/Auth/useValidateNickname";

export default function App() {
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
  const onSubmit = (data) => signup(data);
  const email = watch("email");
  const nickname = watch("nickname");

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <label>이메일</label>
      <input
        type="text"
        {...register("email", {
          required: true,
          pattern: {
            value: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
            message: "이메일 형식이 아닙니다.",
          },
        })}
      />
      {errors.email && <p>{errors.email.message}</p>}
      <button onClick={() => valEmail(email)}></button>
      <label>비밀번호</label>
      <input
        type="password"
        {...register("password", {
          required: "비밀번호는 필수입니다.",
          pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/i,
            message: "숫자/영문자 조합으로 8~16자로 입력해주세요.",
          },
        })}
      />
      {errors.password && <p>{errors.password.message}</p>}

      <label>비밀번호 확인</label>
      <input
        type="password"
        {...register("confirm_password", {
          required: "비밀번호 확인은 필수입니다.",
          validate: (value) => {
            return (
              value === getValues("password") || "비밀번호가 일치하지 않습니다."
            );
          },
        })}
      />
      {errors.confirm_password && <p>{errors.confirm_password.message}</p>}

      <label>닉네임</label>
      <input
        type="nickname"
        {...register("nickname", {
          required: "닉네임은 필수입니다.",
          maxLength: {
            value: 10,
            message: "닉네임은 10자 이하로 설정해주세요.",
          },
        })}
      />
      {errors.nickname && <p>{errors.nickname.message}</p>}
      <button onClick={() => valNickname(nickname)}></button>

      <label>프로필 사진</label>
      <input type="file" accept="image/png, image/jpeg" />

      <input type="submit" onClick={handleSubmit(onSubmit)} />
    </form>
  );
}

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { loign_box, input_box } from "../../css/login_css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import useLogin from "../../hooks/Auth/useLogin";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

const OkButton = styled(Button)({
  backgroundColor: "#897A5F",
  borderColor: "#897A5F",
  "&:hover": {
    backgroundColor: "#c7b595",
    borderColor: "#c7b595",
  },
});

function Login() {
  const { mutate: login, isLoading: loginLoading } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => login(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="이메일주소" {...register("email")} />

      {/* include validation with required or other standard HTML validation rules */}
      <input type="password" placeholder="비밀번호" {...register("password", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}

      <input type="submit" value="로그인" />
    </form>
  );
}

export default Login;

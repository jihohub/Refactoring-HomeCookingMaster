import React, { useState } from "react";
import LoginForm from "../components/Login/LoginForm";
import { login_all, login_title } from "../css/login_css";

function login() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
        <LoginForm />
    </div>
  );
}

export default login;

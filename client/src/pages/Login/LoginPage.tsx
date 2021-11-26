/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import Login from "../../components/Login/login";
import SimpleLogin from "../../components/Login/simple_login";
import { login_all } from "../../css/login_css";
import ToRegister from "../../components/Login/to_register";

function LoginPage() {
    return (
        <div css={login_all}>
            <Login />
            <SimpleLogin />
            <ToRegister />
        </div>
    );
}

export default LoginPage;

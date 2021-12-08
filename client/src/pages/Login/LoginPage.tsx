/** @jsxImportSource @emotion/react */
import Login from "../../components/Login/login";
import { login_all, login_title } from "../../css/login_css";
import ToRegister from "../../components/Login/to_register";

function LoginPage() {
    return (
        <div css={login_all}>
            <h1 css={login_title}>로그인</h1>
            <Login />
            <ToRegister />
        </div>
    );
}

export default LoginPage;

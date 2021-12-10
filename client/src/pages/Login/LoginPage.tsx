/** @jsxImportSource @emotion/react */
import Login from "../../components/Login/login";
import { login_all, login_title } from "../../css/login_css";
import ToRegister from "../../components/Login/to_register";

function LoginPage() {
    return (
        <div style={{width:'100vw', height:'100vh'}}>
            <div css={login_all}>
                <h1 css={login_title}>로그인</h1>
                <Login />
                <ToRegister />
            </div>
        </div>
    );
}

export default LoginPage;

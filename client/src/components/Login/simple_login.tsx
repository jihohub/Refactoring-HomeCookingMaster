/** @jsxImportSource @emotion/react */
import {Link} from 'react-router-dom';
import kakaoLogin from '../../assets/kakao_login_medium.png'
import { loign_box,simple_login } from "../../css/login_css";

function SimpleLogin() {

    return (
        <div>
            <div className="login" css={loign_box}>
                <p css={simple_login}>sns 로그인</p>
                <img src={kakaoLogin} alt="kakaoLogin"/>
            </div>
        </div>
    );
}

export default SimpleLogin;

/** @jsxImportSource @emotion/react */
import React from 'react';
import { useEffect } from 'react';
import {Link} from 'react-router-dom';
import kakaoLogin from '../../assets/kakao_login_medium.png'
import { loign_box,simple_login } from "../../css/login_css";

function SimpleLogin() {
    // const kakao = (window as any).Kakao
    
    // useEffect(() => {
    //     kakao.init("***********************");
    //     console.log('kakao',kakao.isInitialized())
    // })

    // const loginWithKakao = () =>{
    //     kakao.Auth.authorize({
    //         redirectUri: 'http://localhost:3000'
    //     })
    // }

    return (
        <div>
            <div className="login" css={loign_box} >
                <p css={simple_login} >sns 로그인</p>
                <img src={kakaoLogin} alt="kakaoLogin"/>
            
            </div>
        </div>
    );
}

export default SimpleLogin;

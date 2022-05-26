import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import { loign_box, input_box } from "../../css/login_css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// import { getUser } from '../../modules/userLogin';
import { styled } from '@mui/material/styles';

const OkButton = styled(Button)({
    backgroundColor: '#897A5F',
    borderColor: '#897A5F',
    '&:hover': {
        backgroundColor: '#c7b595',
        borderColor: '#c7b595',
    },
});

function Login() {
    const router = useRouter();

    const [id, setId] = useState<string>("");
    const [pw, setPw] = useState<string>("");
    const [check, setCheck] = useState<boolean>(true) // 아이디, 비밀번호 모두 입력됐는지 확인

    // useEffect(() => {
    //     if (token.refresh_token && token.access_token) {
    //         sessionStorage.setItem("usrRfshTkn", token.refresh_token);
    //         sessionStorage.setItem("usrAcsTkn", token.access_token);
    //         sessionStorage.setItem("user_id", token.user_id);
    //         sessionStorage.setItem("nickname", token.nickname);
    //         sessionStorage.setItem("img", token.img);
    //         router.push("/");
    //     } 
    // }, [token]);

    // const handleKeyPress = (e:any) => {
    //     if(e.key === 'Enter'){
    //         e.preventDefault();
    //         handleLogin();
    //     }
    // }

    // const handleLogin = async () => {
    //     // console.log("<login> : before dispatch")
    //     await dispatch(getUser({
    //         email : id,
    //         password : pw
    //     }))
    //     setCheck(false);
    // }
    
    return (
        <div >
            <div className="login" css={loign_box}>
                <TextField 
                    id="email" 
                    type="email" 
                    label="아이디(이메일)을 입력해주세요." 
                    variant="filled" 
                    color="warning" 
                    css={input_box}
                    onChange={(e) => setId(e.target.value)}
                />
                <TextField 
                    id="pw" 
                    type="password" 
                    label="비밀번호를 입력해주세요." 
                    variant="filled" 
                    color="warning" 
                    css={input_box}
                    onChange={(e) => setPw(e.target.value)}
                    // onKeyPress={handleKeyPress}
                />
                {check ? "" : <p style={{ color:'#e45a41', marginBottom:'10px', fontWeight:'600'}}>아이디와 비밀번호를 확인해주세요.</p>}
                {/* <OkButton
                    variant="contained" 
                    onClick={handleLogin} 
                    css={input_box}
                >
                로그인
                </OkButton> */}
            </div>
        </div>
    );
}

export default Login;

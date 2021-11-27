/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import {Link} from 'react-router-dom';
import { login_title, loign_box, input_box } from "../../css/login_css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Login() {
    const [check, setCheck] = useState<boolean>(true)

    const checkIdNPw = () => {
        const id = (document.getElementById('email') as HTMLInputElement).value
        const pw = (document.getElementById('pw') as HTMLInputElement).value
        if(id && pw){
            setCheck(true)
        }else{
            setCheck(false);
        }
    }

    return (
        <div>
            <h1 css={login_title}>로그인</h1>
            <div className="login" css={loign_box}>
                <TextField 
                    id="email" 
                    type="email" 
                    label="아이디(이메일)을 입력해주세요." 
                    variant="filled" 
                    color="warning" 
                    css={input_box}
                />
                <TextField 
                    id="pw" 
                    type="password" 
                    label="비밀번호를 입력해주세요." 
                    variant="filled" 
                    color="warning" 
                    css={input_box}
                />
                {check ? "" : <p style={{color:'red'}}>아이디와 비밀번호를 확인해주세요.</p>}
                <Button variant="contained" color="warning" onClick={checkIdNPw} css={input_box}>로그인</Button>
            </div>
        </div>
    );
}

export default Login;
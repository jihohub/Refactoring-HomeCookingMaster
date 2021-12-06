/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { RootStateOrAny } from 'react-redux';
import { login_title, loign_box, input_box } from "../../css/login_css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { getUser, getUserInfo } from '../../redux/userLogin';
import { useDispatch, useSelector } from 'react-redux';

function Login() {
    const [check, setCheck] = useState<boolean>(true)
    const [id, setId] = useState<string>("");
    const [pw, setPw] = useState<string>("");

    const dispatch = useDispatch();

    const idChange = (e:any) => {
        e.preventDefault();
        setId(e.target.value)
    }

    const pwChange = (e:any) => {
        e.preventDefault();
        setPw(e.target.value)
    }

    let token = useSelector((state:RootStateOrAny) => state.getUserInfo.list)

    const checkLogState = () => {
        dispatch(getUser({
            email : id,
            password : pw
        }))
        

        // dispatch(getUserInfo)
        // if(!token){
        //     setCheck(false)
        //     console.log('false 됨')
        // }
        // window.location.replace('/')
    }

    const handleLogin = (e:any) => {
        e.preventDefault();
        if(id && pw){
            setCheck(true)
            checkLogState();
            console.log('들어옴')
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
                    onChange={idChange}
                />
                <TextField 
                    id="pw" 
                    type="password" 
                    label="비밀번호를 입력해주세요." 
                    variant="filled" 
                    color="warning" 
                    css={input_box}
                    onChange={pwChange}
                />
                {check ? "" : <p style={{color:'red'}}>아이디와 비밀번호를 확인해주세요.</p>}
                <Button
                    variant="contained" color="warning" 
                    onClick={handleLogin} 
                    css={input_box}>로그인</Button>
            </div>
        </div>
    );
}

export default Login;
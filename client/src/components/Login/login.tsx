/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { RootStateOrAny } from 'react-redux';
import { loign_box, input_box } from "../../css/login_css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { getUser, getUserInfo } from '../../redux/userLogin';
import { useDispatch, useSelector } from 'react-redux';

// const GetToken = async() => {
//     console.log("<login> : in GetToken")
//     const token = await useSelector((state:RootStateOrAny) => state.getUserInfo.list);
//     console.log("<login> : token complete")
//     return token
// }
// -> 오류남

function Login() {
    const dispatch = useDispatch();

    const [id, setId] = useState<string>("");
    const [pw, setPw] = useState<string>("");
    const [check, setCheck] = useState<boolean>(true) // 아이디, 비밀번호 모두 입력됐는지 확인

    // const idChange = (e:any) => {
    //     setId(e.target.value)
    // }

    // const pwChange = (e:any) => {
    //     setPw(e.target.value)
    // }

    const token = useSelector((state:RootStateOrAny) => state.getUserInfo.list);

    const checkLogState = () => {
        console.log("<login> : before dispatch")
        dispatch(getUser({
            email : id,
            password : pw
        }))
        console.log("<login> : after dispatch")
        // if(!token){
        //     setCheck(false)
        //     console.log('false 됨')
        // }
        // window.location.replace('/')
        // GetToken();
        // console.log("<login> : after GetToken")
    }

    const handleLogin = (e:any) => {
        if(id && pw){
            console.log("<login> : 아이디, 비밀번호 모두 입력됨")
            checkLogState();
            console.log("<login> : dispatch 함수 다음")
            setCheck(true)
            console.log("<login> : check값 true됨")
            console.log("<login> : 받아온 token값 : ", token);
        }else{
            setCheck(false);
        }
    }

    return (
        <div>
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
                />
                {check ? "" : <p style={{color:'red'}}>아이디와 비밀번호를 확인해주세요.</p>}
                <Button
                    variant="contained" 
                    color="warning" 
                    onClick={handleLogin} 
                    css={input_box}
                >
                로그인
                </Button>
            </div>
        </div>
    );
}

export default Login;
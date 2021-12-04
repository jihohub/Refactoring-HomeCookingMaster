/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router";
import { userInfo,terms_title,line,input_box,check_box,option_title,profile_img,btn,option_box, file_select,option_sub_title } from "../../css/register_css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import axios from "axios";

function UserInfo() {
    const [email, setEmail] = useState<string>("");
    const [pw, setPw] = useState<string>("");
    const [nickname, setNickname] = useState<string>("");

    // 다음페이지로 전달할 state
    const [resultName, setResultName] = useState<string>("");
    const navigate = useNavigate();

    // ====================================================================
    // 유효성검사
    const [pwCheck, setPwCheck] = useState<boolean>(true); // 비밀번호 확인
    const [emailVal, setemailVal] = useState<boolean>(true); // 이메일 유효성
    const [pwVal, setPwVal] = useState<boolean>(false); // 비밀번호 유효성
    const [nicknameVal, setNicknameVal] = useState<boolean>(true); // 닉네임 유효성
    const [profileImage, setProfileImage] = useState<String | ArrayBuffer | null>("");

    const emailForm = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    const number = /[0-9]/;
    const english = /[a-zA-Z]/;

    const emailValidation = (e:any) => {
        // const email = (document.getElementById('email') as HTMLInputElement).value;
        setEmail(e.target.value)

        if (emailForm.test(email)){
            setemailVal(true)
        }else{
            setemailVal(false)
        }
    }
    
    const pwValidation = (e:any) => {
        // const pw = (document.getElementById('pw') as HTMLInputElement).value;
        setPw(e.target.value)

        if (pw.length > 7 && pw.length <17 && number.test(pw) && english.test(pw)){
            setPwVal(true);
        }else{
            setPwVal(false);
        }
    }

    const nameValidation = (e:any) => {
        // const name = (document.getElementById('name') as HTMLInputElement).value;
        setNickname(e.target.value)

        if (nickname){
            setNicknameVal(true)
        }else{
            setNicknameVal(false)
        }
    }

    const checkPw = () => {
        const pwCheck = (document.getElementById('pwCheck') as HTMLInputElement).value;

        if (pw === pwCheck){
            setPwCheck(true)
        }else{
            setPwCheck(false)
        }
    }
    // ====================================================================

    // 프로필 사진
    const handleImage = (e: any) => {
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            setProfileImage(reader.result);
        }
        reader.readAsDataURL(file);
    }
    
    // 회원가입 api
    const signup = async() => {
        const res = await axios.post('/api/auth/signup', {
            email : email,
            password : pw,
            nickname : nickname
        })
        console.log(res);
        setResultName(res.data.data.nickname)
    }
    // ====================================================================
    // 중복확인
    const [ableEmail, setAbleEmail] = useState<boolean>(false);
    const confirmEmail = async () => {
        const res = await axios.post("/api/auth/signup/val_email", {
            email : email
        })
        setAbleEmail(res.data.is_valid)
    }
    const [ableName, setAbleName] = useState<boolean>(false);
    const confirmName = async () => {
        const res = await axios.post("/api/auth/signup/val_nickname", {
            nickname : nickname
        })
        setAbleName(res.data.is_valid)
    }

    // ====================================================================
    // 회원가입 완료 처리

    const handleComplete = () => {
        if(ableEmail && pwVal && pwCheck && ableName){
            signup()
            navigate('/register/complete', {state : resultName})
        }else{
            if(!emailVal){
                setemailVal(false)
            }
            if(!pwCheck){
                setPwCheck(false)
            }
            if(!pwVal){
                setPwVal(false)
            }
            if(!nickname){
                setNicknameVal(false)
            }
            if(!ableName){
                setAbleEmail(false)
            }
            if(!ableEmail){
                setAbleName(false)
            }
        }
    }
    
    return (
        <div css={userInfo}>
            <h2 css={terms_title}>정보입력</h2>
            <div css={line}></div>
            <div>
                <div css={check_box}>
                    <TextField 
                        id="email" label="아이디(이메일)" type="email" 
                        variant="standard" color="warning" size="small" 
                        css={input_box}
                        onChange={emailValidation}
                    />
                    <Button 
                        variant="outlined" color="warning" 
                        disabled={!emailVal}
                        onClick={confirmEmail}
                    >중복확인</Button>
                </div>
                <div css={input_box} >
                    {emailVal ? "" : <p style={{color:'red', fontSize:'15px', paddingBottom:'2%'}}>아이디를 이메일 형식으로 입력해주세요.</p>}
                    {ableEmail ? <p style={{color:'blue', fontSize:'15px'}}>아이디 사용 가능합니다.</p> : <p style={{color:'red', fontSize:'15px'}}>아이디 중복확인 해주세요.</p>}
                </div>
                <div>
                    <TextField 
                        id="pw" label="비밀번호" type="password" 
                        variant="standard" color="warning" size="small" 
                        css={input_box} 
                        onChange={pwValidation}
                    />
                </div>
                <div css={input_box} >
                    {pwVal ? "" : <p style={{color:'red', fontSize:'15px'}}>숫자/영문자 조합으로 8~16자로 입력해주세요.</p>}
                </div>
                <div>
                    <TextField 
                        id="pwCheck" label="비밀번호 확인" type="password" 
                        variant="standard" color="warning" size="small" 
                        css={input_box} 
                        onChange={checkPw}
                    />
                </div>
                <div css={input_box} >
                    {pwCheck ? "" : <p style={{color:'red', fontSize:'15px'}}>비밀번호가 일치하지 않습니다.</p>}
                </div>
                <div>
                    <TextField 
                        id="name" label="닉네임" variant="standard" 
                        color="warning" size="small" 
                        css={input_box}
                        onChange={nameValidation}
                    />
                    <Button 
                        variant="outlined" color="warning"
                        onClick={confirmName}
                    >중복확인</Button>
                </div>
                <div css={input_box} >
                    {nicknameVal ? "" : <p style={{color:'red', fontSize:'15px', paddingBottom:'2%'}}>닉네임을 입력해주세요.</p>}
                    {ableName ? <p style={{color:'blue', fontSize:'15px'}}>닉네임 사용 가능합니다.</p> : <p style={{color:'red', fontSize:'15px'}}>닉네임 중복확인 해주세요.</p>}
                </div>
            </div>
            <div css={option_box}>
                <p css={option_title}>선택사항</p>
                <div>
                    <h4 css={option_sub_title}>프로필 사진</h4>
                    <div css={profile_img}>
                        <Avatar alt="profile img" src={typeof profileImage == "string" ? profileImage : ""} sx={{ width: 112, height: 112 }}/>
                        <input 
                            type="file" id="profile" name="profile" 
                            accept="image/*" 
                            css={file_select}
                            onChange={handleImage}
                        />
                    </div>
                    <br />
                    <h4 css={option_sub_title}>한줄 소개</h4>
                    <div>
                        <textarea 
                            id="introduction" name="introduction" 
                            cols={54} rows={5} 
                            placeholder="한줄 소개를 작성해주세요."
                        />
                    </div>
                </div>
            </div>
            <div>
                <Button variant="contained" color="warning" css={btn} onClick={handleComplete}>
                    가입완료
                </Button>
            </div>
        </div>
    );
}

export default UserInfo;

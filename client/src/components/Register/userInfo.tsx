/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { Link } from 'react-router-dom';
import { userInfo,terms_title,line,input_box,check_box,option_title,profile_img,btn,option_box, file_select,option_sub_title } from "../../css/register_css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

function UserInfo() {
    const [emailVal, setemailVal] = useState<boolean>(true);
    const [check, setCheck] = useState<boolean>(true);
    const [pwTerms, setPwTerms] = useState<boolean>(false);
    const [nickname, setNickname] = useState<boolean>(true)
    const [profileImage, setProfileImage] = useState<String | ArrayBuffer | null>("");

    // 유효성검사
    const emailForm = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    const number = /[0-9]/;
    const english = /[a-zA-Z]/;

    const checkEmailForm = () => {
        const email = (document.getElementById('email') as HTMLInputElement).value;

        if (emailForm.test(email)){
            setemailVal(true)
        }else{
            setemailVal(false)
        }
    }
    
    const pwConditions = () => {
        const pw = (document.getElementById('pw') as HTMLInputElement).value;

        if (pw.length > 7 && pw.length <17 && number.test(pw) && english.test(pw)){
            setPwTerms(true);
        }else{
            setPwTerms(false);
        }
    }

    const checkPw = () => {
        const pw = (document.getElementById('pw') as HTMLInputElement).value;
        const pwCheck = (document.getElementById('pwCheck') as HTMLInputElement).value;

        if (pw === pwCheck){
            setCheck(true)
        }else{
            setCheck(false)
        }
    }

    const handleName = () => {
        const name = (document.getElementById('name') as HTMLInputElement).value;
        if (name){
            setNickname(true)
        }else{
            setNickname(false)
        }
    }

    const handleImage = (e: any) => {
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            setProfileImage(reader.result);
        }
        reader.readAsDataURL(file);
    }

    const handleComplete = () => {
        if(emailVal && pwTerms && check && nickname){
            window.location.replace('/register/complete')
        }else{
            setemailVal(false)
            setCheck(false)
            setPwTerms(false)
            setNickname(false)
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
                    />
                    <Button 
                        variant="outlined" 
                        color="warning" 
                        onClick={checkEmailForm}
                    >중복확인</Button>
                </div>
                <div css={input_box} >
                    {emailVal ? "" : <p style={{color:'red', fontSize:'15px'}}>아이디를 이메일 형식으로 입력해주세요.</p>}
                </div>
                <div>
                    <TextField 
                        id="pw" label="비밀번호" type="password" 
                        variant="standard" color="warning" size="small" 
                        css={input_box} 
                        onChange={pwConditions}
                    />
                </div>
                <div css={input_box} >
                    {pwTerms ? "" : <p style={{color:'red', fontSize:'15px'}}>숫자/영문자 조합으로 8~16자로 입력해주세요.</p>}
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
                    {check ? "" : <p style={{color:'red', fontSize:'15px'}}>비밀번호가 일치하지 않습니다.</p>}
                </div>
                <div>
                    <TextField 
                        id="name" label="닉네임" variant="standard" 
                        color="warning" size="small" 
                        css={input_box}
                        onChange={handleName}
                    />
                    <Button variant="outlined" color="warning">중복확인</Button>
                </div>
                <div css={input_box} >
                    {nickname ? "" : <p style={{color:'red', fontSize:'15px'}}>닉네임을 입력해주세요.</p>}
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
                {/* <Link to="/register/complete" css={agree_btn}> */}
                    <Button variant="contained" color="warning" css={btn} onClick={handleComplete}>
                        가입완료
                    </Button>
                {/* </Link> */}
            </div>
        </div>
    );
}

export default UserInfo;

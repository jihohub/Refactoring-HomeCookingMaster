/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { userInfo,terms_title,line,input_box,check_box,option_title,profile_img,btn,option_box, file_select,option_sub_title } from "../../css/register_css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import axios from "axios";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

function UserInfo() {
    const [email, setEmail] = useState<string>("");
    const [pw, setPw] = useState<string>("");
    const [nickname, setNickname] = useState<string>("");
    const [profileImage, setProfileImage] = useState<String | ArrayBuffer | null>("");

    const navigate = useNavigate();
    // 회원가입 api
    const signup = async() => {
        const res = await axios.post('/api/auth/signup', {
            email : email,
            password : pw,
            nickname : nickname
        })
        console.log(res);
        navigate('/register/complete', {state : res.data.data.nickname})
    }

    // useEffect(() => {
    //     navigate('/register/complete', {state : resultName})
    // },[resultName])

    // ====================================================================
    // 유효성검사
    const [emailVal, setemailVal] = useState<boolean>(false); // 이메일 유효성 여부
    const [pwVal, setPwVal] = useState<boolean>(false); // 비밀번호 유효성 여부
    const [pwCheck, setPwCheck] = useState<boolean>(false); // 비밀번호 일치 여부
    const [nicknameVal, setNicknameVal] = useState<boolean>(false); // 닉네임 유효성 여부

    const emailForm = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    const number = /[0-9]/;
    const english = /[a-zA-Z]/;

    const emailValidation = (e:any) => {
        setEmail(e.target.value)

        if (emailForm.test(email)){
            setemailVal(true)
        }else{
            setemailVal(false)
        }
    }, [email]);
    
    const pwValidation = (e:any) => {
        setPw(e.target.value)

        if (pw.length > 6 && pw.length <16 && number.test(pw) && english.test(pw)){
            setPwVal(true);
        } else {
            setPwVal(false);
        }
    }, [pw]);

    const checkPw = () => {
        const pwCheck = (document.getElementById('pwCheck') as HTMLInputElement).value;

        if (pw === pwCheck){
            setPwCheck(true)
        }else{
            setPwCheck(false)
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

    const nameValidation = (e:any) => {
        setNickname(e.target.value)

        if (nickname){
            setNicknameVal(true)
        }else{
            setNicknameVal(false)
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

    // ====================================================================
    // 중복확인
    const [ableEmail, setAbleEmail] = useState<boolean>(false);
    const confirmEmail = async () => {
        const res = await axios.post("/api/auth/signup/val_email", {
            email : email
        })
        setAbleEmail(res.data.is_valid)
        handleOpen1();
    }
    const [ableName, setAbleName] = useState<boolean>(false);
    const confirmName = async () => {
        const res = await axios.post("/api/auth/signup/val_nickname", {
            nickname : nickname
        })
        setAbleName(res.data.is_valid)
        handleOpen2();
    }

    // ====================================================================
    // 회원가입 완료 처리
    const handleComplete = () => {
        if(emailVal && ableEmail && pwVal && pwCheck && nicknameVal && ableName){
            signup()
            // navigate('/register/complete', {state : resultName})
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

    // ====================================================================
    // 중복확인 modal
    const [open1, setOpen1] = useState(false);
    const handleOpen1 = () => setOpen1(true);
    const handleClose1 = () => setOpen1(false);

    const [open2, setOpen2] = useState(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);
    
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
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button 
                        variant="outlined" color="warning" 
                        disabled={!(emailVal && email.length >0)}
                        onClick={confirmEmail}
                    >중복확인</Button>
                    <Modal
                        open={open1}
                        onClose={handleClose1}
                        >
                        <Box sx={style}>
                            <Typography variant="h6" component="h2">
                                중복확인
                            </Typography>
                            <Typography sx={{ mt: 2 }}>
                                {ableEmail ? "사용가능한 아이디입니다." : "사용할 수 없는 아이디입니다."}
                            </Typography>
                            <Button onClick={handleClose1} color="warning">확인</Button>
                        </Box>
                    </Modal>
                </div>
                <div css={input_box} >
                    {emailVal ? "" : <p style={{color:'red', fontSize:'15px', paddingBottom:'2%'}}>아이디를 이메일 형식으로 입력해주세요.</p>}
                    {ableEmail ? "" : <p style={{color:'red', fontSize:'15px'}}>아이디 중복확인 해주세요.</p>}
                    {/* {ableEmail && emailVal ? <p style={{color:'blue', fontSize:'15px'}}>아이디 사용 가능합니다.</p> : ""} */}
                </div>
                <div>
                    <TextField 
                        id="pw" label="비밀번호" type="password" 
                        variant="standard" color="warning" size="small" 
                        css={input_box} 
                        onChange={(e) => setPw(e.target.value)}
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
                        disabled={!(nicknameVal && nickname.length >0)}
                        onClick={confirmName}
                    >중복확인</Button>
                    <Modal
                        open={open2}
                        onClose={handleClose2}
                        >
                        <Box sx={style}>
                            <Typography variant="h6" component="h2">
                                중복확인
                            </Typography>
                            <Typography sx={{ mt: 2 }}>
                                {ableName ? "사용가능한 닉네임입니다." : "사용할 수 없는 닉네임입니다."}
                            </Typography>
                            <Button onClick={handleClose2} color="warning">확인</Button>
                        </Box>
                    </Modal>
                </div>
                <div css={input_box} >
                    {nicknameVal ? "" : <p style={{color:'red', fontSize:'15px', paddingBottom:'2%'}}>닉네임을 입력해주세요.</p>}
                    {ableName ? "" : <p style={{color:'red', fontSize:'15px'}}>닉네임 중복확인 해주세요.</p>}
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
                <Button 
                    variant="contained" color="warning" 
                    css={btn} onClick={signup}
                    disabled={ableSignUp ? false : true}
                >
                    가입완료
                </Button>
            </div>
        </div>
    );
}

export default UserInfo;

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 200,
    bgcolor: '#ffffff',
    border: '10px solid #ffb62e',
    boxShadow: 24,
    p: 4,
};
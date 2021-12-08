/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { userInfo,terms_title,line,input_box,check_box,option_title,profile_img,btn,option_box, file_select,option_sub_title, introText } from "../../css/register_css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import axios from "axios";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';

function UserInfo() {
    const [email, setEmail] = useState<string>("");
    const [pw, setPw] = useState<string>("");
    const [nickname, setNickname] = useState<string>("");
    const [profileImage, setProfileImage] = useState<String | ArrayBuffer | null>("");
    const [intro, setIntro] = useState<String | null>("");

    const navigate = useNavigate();

    const formData = new FormData();
    // 회원가입 api
    const signup = async () => {
        formData.append("email", email);
        formData.append("password", pw);
        formData.append("nickname", nickname);
        
        const res = await axios.post("/api/auth/signup", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        console.log(res);
        navigate('/register/complete', {state : res.data.data.nickname})   // 회원가입 완료시 닉네임값 전달
    }

    // ====================================================================
    // 유효성검사
    const [emailVal, setEmailVal] = useState<boolean>(false); // 이메일 유효성 여부
    const [pwVal, setPwVal] = useState<boolean>(false); // 비밀번호 유효성 여부
    const [pwCheck, setPwCheck] = useState<boolean>(false); // 비밀번호 일치 여부
    const [nicknameVal, setNicknameVal] = useState<boolean>(false); // 닉네임 유효성 여부

    const emailForm = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    const number = /[0-9]/;
    const english = /[a-zA-Z]/;

    useEffect(() => {
        if (emailForm.test(email)) {
            setEmailVal(true);
        } else {
            setEmailVal(false);
        }
    }, [email]);
    
    useEffect(() => {
        if (
            pw.length > 7 &&
            pw.length < 17 &&
            number.test(pw) &&
            english.test(pw)
        ) {
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
        formData.append("img", file);
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
    // 회원가입 완료 버튼 활성화 처리(정보 입력 완료 여부 확인)
    const [ableSignUp, setAbleSignUp] = useState<boolean>(false);

    useEffect(() => {
        if (ableEmail && pwVal && pwCheck && ableName) {
            setAbleSignUp(true);
        }
    }, [ableEmail, pwVal, pwCheck, ableName]);

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
            {/* <div css={line}></div> */}
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
                            <CheckButton onClick={handleClose1} sx = {{fontWeight:700, fontSize:'15px'}}>확인</CheckButton>
                        </Box>
                    </Modal>
                </div>
                <div css={input_box} >
                    {emailVal ? "" : <p style={{color:'#e45a41', fontSize:'15px', paddingBottom:'2%', fontWeight:'500'}}>아이디를 이메일 형식으로 입력해주세요.</p>}
                    {ableEmail ? "" : <p style={{color:'#e45a41', fontSize:'15px', fontWeight:'500'}}>아이디 중복확인 해주세요.</p>}
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
                    {pwVal ? "" : <p style={{color:'#e45a41', fontSize:'15px', fontWeight:'500'}}>숫자/영문자 조합으로 8~16자로 입력해주세요.</p>}
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
                    {pwCheck ? "" : <p style={{color:'#e45a41', fontSize:'15px', fontWeight:'500'}}>비밀번호가 일치하지 않습니다.</p>}
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
                            <CheckButton onClick={handleClose2} >확인</CheckButton>
                        </Box>
                    </Modal>
                </div>
                <div css={input_box} >
                    {nicknameVal ? "" : <p style={{color:'#e45a41', fontSize:'15px', paddingBottom:'2%', fontWeight:'500'}}>닉네임을 입력해주세요.</p>}
                    {ableName ? "" : <p style={{color:'#e45a41', fontSize:'15px', fontWeight:'500'}}>닉네임 중복확인 해주세요.</p>}
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
                </div>
            </div>
            <div>
                <OkButton 
                    variant="contained"
                    css={btn} onClick={signup}
                    disabled={ableSignUp ? false : true}
                >
                    가입완료
                </OkButton>
            </div>
        </div>
    );
}

export default UserInfo;




// 중복확인 모달
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 200,
    bgcolor: 'white',
    border: '10px solid white',
    color : '#ED6C02',
    boxShadow: 24,
    p: 4,
};

// 중복확인 모달 내 확인 버튼
const CheckButton = styled(Button)({
    marginTop:'20px',
    backgroundColor: '#ED6C02',
    borderColor: '#ED6C02',
    color:'white',
    '&:hover': {
        backgroundColor: '#897A5F',
        borderColor: '#897A5F',
        color:'white',
    },
});

// 가입완료 버튼
const OkButton = styled(Button)({
    backgroundColor: '#897A5F',
    borderColor: '#897A5F',
    '&:hover': {
        backgroundColor: '#ED6C02',
        borderColor: '#ED6C02',
    },
});

/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { getMyInfo } from "../../modules/myInfo";
import { getNewAccess } from "../../modules/newToken";
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import axios from "axios";
import Modal from '@mui/material/Modal';
import {avatar} from '../../assets/mainAvatar.png'

function IntroMe(){
    const dispatch = useDispatch();
    const refreshTkn = sessionStorage.getItem('usrRfshTkn')
    const [isInfo, setIsInfo] = useState(false);

    const newToken = useSelector((state:RootStateOrAny) => state.getNewAccessList.list)

    useEffect(() => {
        console.log("<IntroMe> : dispatch > getMyInfo")
        dispatch(getMyInfo());
    },[])

    const myInfo = useSelector((state:RootStateOrAny) => state.getMyInfoList.list)

    useEffect(() => {
        console.log("<IntroMe> : myInfo : ", myInfo)
        if(Array.isArray(myInfo) && myInfo.length === 0){
            console.log("<IntroMe> : myInfo empty")
        }else if(!myInfo){
            console.log("<IntroMe> : myInfo false")
            handleToken();
        }else{
            console.log("<IntroMe> : myInfo true ", myInfo.data.user_info)
            setIsInfo(true);
        }
    }, [myInfo])

    const handleToken = () => {
        dispatch(getNewAccess({
            refresh_token : refreshTkn
        }))
    }

    useEffect(() => {
        console.log("<newToken> : ", newToken)
        if(Array.isArray(newToken) && newToken.length === 0){
            console.log("<newToken> : token empty")
        }else if(!newToken){
            console.log("<newToken> : token false")
        }else{
            console.log("<newToken> : token true ", newToken.data)
            sessionStorage.removeItem('usrAcsTkn')
            sessionStorage.setItem('usrAcsTkn', newToken.data['access_token'])
            console.log("<newToken> : dispatch > again")
            dispatch(getMyInfo());
        }
    },[newToken])

    // 프로필 사진 수정 api
    const userId = sessionStorage.getItem('user_id')
    const [profileImage, setProfileImage] = useState<String | ArrayBuffer | null>("");

    // const handleProfile = () => {
    //     const res = axios.post('/api/mypage/editimg', {
    //         user_id : userId ,
    //         img :
    //     })
    // }

    // 프로필 수정 버튼 - 모달
    const modifyImg = () => {
        handleOpen1();
    }

    const [open1, setOpen1] = useState(false);
    const handleOpen1 = () => setOpen1(true);
    const handleClose1 = () => setOpen1(false);
    

    return(
        <>
            {isInfo ? 
                <div style={{ width: '100%' }}>
                    <Box component="div"
                        sx={{
                        display: 'flex',
                        // justifyContent: 'center',
                        flexDirection : 'row',
                        marginLeft : '25%'
                        }}
                    >
                        <Avatar
                            alt={myInfo.data.user_info.nickname}
                            src={myInfo.data.user_info.img}
                            sx={{ width: 128, height: 128 }}
                        />
                        <Box component="div"
                            sx={{
                                display: 'flex',
                                flexDirection : 'column',
                                pl : 5
                            }}
                        >
                            <Box component="div"
                                sx={{ 
                                    display: 'flex', 
                                    flexDirection : 'row', 
                                    alignItems: 'flex-end' }}>
                                <Typography variant="h4" gutterBottom component="div">
                                    {myInfo.data.user_info.nickname}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom component="div" sx={{ pl : 4, pb:1 }}>
                                    Lv. {myInfo.data.user_info.exp}
                                </Typography>
                            </Box>
                            <Box component="div" 
                                sx={{ 
                                    display: 'flex', 
                                    flexDirection : 'row'}}>
                                <Typography variant="subtitle1" gutterBottom component="div">
                                    작성리뷰 {myInfo.data.my_post.length}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom component="div" sx={{ pl : 2 }}>
                                    스크랩레시피 {myInfo.data.liked_recipe.length}
                                </Typography>
                            </Box>
                            <Box component="div">
                                <OkButton variant="outlined" onClick={modifyImg}>프로필 사진 수정</OkButton>
                            </Box>
                            <Modal
                                open={open1}
                                onClose={handleClose1}
                                >
                                <Box sx={style}>
                                    <Typography variant="h6" component="h2">
                                        프로필 수정
                                    </Typography>
                                    {/* <Typography sx={{ mt: 2 }}>
                                    <Avatar alt="profile img" src={typeof profileImage == "string" ? profileImage : {avatar}} sx={{ width: 112, height: 112 }}/>
                                    <input 
                                        type="file" id="profile" name="profile" 
                                        accept="image/*" 
                                    />
                                    </Typography> */}
                                    <CheckButton onClick={handleClose1} sx = {{fontWeight:700, fontSize:'15px'}}>확인</CheckButton>
                                </Box>
                            </Modal>
                        </Box>
                    </Box>
                </div>
            : "no"}
        </>
    )
}

export default IntroMe;

const OkButton = styled(Button)({
    // backgroundColor: '#897A5F',
    marginTop:'0.5rem',
    borderColor: '#897A5F',
    color : '#584f3d',
    '&:hover': {
        borderColor: '#897A5F',
    },
});

// 중복확인 모달
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '17%',
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
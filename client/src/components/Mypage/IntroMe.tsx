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
import { editImg } from "../../modules/mypageEditImgSlice";
import Modal from '@mui/material/Modal';
// import { profile_img, option_box, file_select } from "../../css/register_css";

// import {avatar} from '../../assets/mainAvatar.png'

function IntroMe() {
    const dispatch = useDispatch();
    const refreshTkn = sessionStorage.getItem("usrRfshTkn");
    const user_img = sessionStorage.getItem("img");
    const [isInfo, setIsInfo] = useState(false);
    const [profileImage, setProfileImage] = useState<String | ArrayBuffer | null>("");


    const newToken = useSelector(
        (state: RootStateOrAny) => state.getNewAccessList.list
    );

    useEffect(() => {
        // console.log("<IntroMe> : dispatch > getMyInfo");
        dispatch(getMyInfo());
    }, [dispatch]);

    const myInfo = useSelector(
        (state: RootStateOrAny) => state.getMyInfoList.list
    );

    // const user_info = useSelector((state: RootStateOrAny) => state.getUserInfo);

    useEffect(() => {
        // console.log("<IntroMe> : myInfo : ", myInfo);
        if (Array.isArray(myInfo) && myInfo.length === 0) {
            // console.log("<IntroMe> : myInfo empty");
        } else if (!myInfo) {
            // console.log("<IntroMe> : myInfo false");
            dispatch(
                getNewAccess({
                    refresh_token: refreshTkn,
                })
            );
        } else {
            // console.log("<IntroMe> : myInfo true ", myInfo.data.user_info);
            setIsInfo(true);
        }
    }, [dispatch, myInfo, refreshTkn]);

    useEffect(() => {
        // console.log("<newToken> : ", newToken);
        if (Array.isArray(newToken) && newToken.length === 0) {
            // console.log("<newToken> : token empty");
        } else if (!newToken) {
            // console.log("<newToken> : token false");
        } else {
            // console.log("<newToken> : token true ", newToken.data);
            sessionStorage.removeItem("usrAcsTkn");
            sessionStorage.setItem("usrAcsTkn", newToken.data["access_token"]);
            // console.log("<newToken> : dispatch > again");
            dispatch(getMyInfo());
        }
    }, [dispatch, newToken]);

    // 프로필 사진 수정 api
    const user_id = String(sessionStorage.getItem("user_id"));
    const formData = new FormData();

    // 프로필 수정 버튼 - 모달
    const modifyImg = () => {
        handleOpen1();
    };

    const [open1, setOpen1] = useState(false);
    const handleOpen1 = () => setOpen1(true);
    const handleClose1 = () => setOpen1(false);

    const handleImage = (e: any) => {
        let reader = new FileReader();
        let file = e.target.files[0];
        formData.set("img", file);
        // console.log(file);

        reader.onloadend = () => {
            setProfileImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = () => {
        formData.set("user_id", user_id);
        dispatch(editImg(formData));
        handleClose1();
        // sessionStorage.setItem("img", new_image);
    };

    return (
        <>
            {isInfo ? (
                <div style={{ width: "100%" }}>
                    <Box
                        component="div"
                        sx={{
                            display: "flex",
                            // justifyContent: 'center',
                            flexDirection: "row",
                            marginLeft: "25%",
                        }}
                    >
                        <Avatar
                            alt={myInfo.data.user_info.nickname}
                            src={typeof user_img == "string" ? user_img : ""}
                            sx={{ width: 128, height: 128 }}
                        />
                        <Box
                            component="div"
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                pl: 5,
                            }}
                        >
                            <Box
                                component="div"
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "flex-end",
                                }}
                            >
                                <Typography
                                    variant="h4"
                                    gutterBottom
                                    component="div"
                                >
                                    {myInfo.data.user_info.nickname}
                                </Typography>
                                {/* <Typography
                                    variant="subtitle1"
                                    gutterBottom
                                    component="div"
                                    sx={{ pl: 4, pb: 1 }}
                                >
                                    Lv. {myInfo.data.user_info.exp}
                                </Typography> */}
                            </Box>
                            <Box
                                component="div"
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                }}
                            >
                                <Typography
                                    variant="subtitle1"
                                    gutterBottom
                                    component="div"
                                >
                                    작성리뷰 {myInfo.data.my_post.length}
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    gutterBottom
                                    component="div"
                                    sx={{ pl: 2 }}
                                >
                                    스크랩레시피{" "}
                                    {myInfo.data.liked_recipe.length}
                                </Typography>
                            </Box>
                            <Box component="div">
                                <OkButton
                                    variant="outlined"
                                    onClick={modifyImg}
                                >
                                    프로필 사진 수정
                                </OkButton>
                            </Box>
                            <Modal open={open1} onClose={handleClose1}>
                                <Box sx={style}>
                                    <Avatar
                                        alt="profile image on the header bar"
                                        src={
                                            typeof profileImage == "string"
                                                ? profileImage
                                                : ""
                                        }
                                        sx={{
                                            width: 112,
                                            height: 112,
                                        }}
                                    />
                                    <input
                                        type="file"
                                        id="profile"
                                        name="profile"
                                        accept="image/*"
                                        onChange={handleImage}
                                    />
                                    <CheckButton
                                        onClick={handleSubmit}
                                        sx={{
                                            fontWeight: 700,
                                            fontSize: "15px",
                                        }}
                                    >
                                        확인
                                    </CheckButton>
                                </Box>
                            </Modal>
                        </Box>
                    </Box>
                </div>
            ) : (
                "no"
            )}
        </>
    );
}

export default IntroMe;

const OkButton = styled(Button)({
    // backgroundColor: '#897A5F',
    marginTop:'0.5rem',
    borderColor: '#897A5F',
    color : '#897A5F',
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
    color : '#897A5F',
    boxShadow: 24,
    p: 4,
};

// 중복확인 모달 내 확인 버튼
const CheckButton = styled(Button)({
    marginTop:'20px',
    backgroundColor: '#897A5F',
    borderColor: '#897A5F',
    color:'white',
    '&:hover': {
        backgroundColor: '#897A5F',
        borderColor: '#897A5F',
        color:'white',
    },
});
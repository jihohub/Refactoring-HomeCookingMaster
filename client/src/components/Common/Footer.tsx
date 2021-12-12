/** @jsxImportSource @emotion/react */
import { Box, Typography } from "@mui/material";
import avatar from "../../assets/avatar.png";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';

const Footer = () => {
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                height: "6rem",
                backgroundColor: "#b4a58a",
                display: "flex",
                alignItems: "center",
            }}
        >
            <img
                src={avatar}
                style={{
                    height: "4rem",
                    cursor: "pointer",
                    margin: "20px"
                }}
                alt="main avatar"
            />
            <Typography sx={{ fontFamily: "EliceBold", marginRight:'5px' }}>
                {"@집밥꼬꼬선생 "}
            </Typography>
            <Foot 
                // sx={{ fontFamily: "Elice", marginLeft: 1,cursor:'pointer' }}
                onClick={() => navigate('/about')}>
                {" 서비스소개 "}
            </Foot>
            <Typography sx={{ fontFamily: "Elice"}}>
                {" ᛫ "}
            </Typography>
            <Foot 
                // sx={{ fontFamily: "Elice", marginLeft: 1,cursor:'pointer' }}
                onClick={() => navigate('/introUs')}>
                {" 팀원소개 "}
            </Foot>
            <Typography sx={{ fontFamily: "Elice"}}>
                {" ᛫ "}
            </Typography>
            <Foot 
                // sx={{ fontFamily: "Elice", marginLeft: 1,cursor:'pointer' }}
                onClick={() => navigate('/register/termsNConditions')}>
                {" 이용약관 "}
            </Foot>
            <Typography sx={{ fontFamily: "Elice"}}>
                {" ᛫ "}
            </Typography>
            <Foot 
                // sx={{ fontFamily: "EliceBold", marginLeft: 1,cursor:'pointer' }}
                onClick={() => window.location.replace('https://kdt-gitlab.elice.io/002-part3-cnn/team5/project-template')}>
                {" Gitlab"}
            </Foot>
        </Box>
    );
}

export default Footer;

const Foot = styled(Typography)({
    fontFamily: "Elice",
    marginLeft: 10,
    marginRight: 10,
    cursor:'pointer',
    '&:hover': {
        color: 'white',
    }
});
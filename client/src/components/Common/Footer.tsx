/** @jsxImportSource @emotion/react */
import { Box, Typography } from "@mui/material";
import avatar from "../../assets/avatar.png";

const Footer = () => {
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
            <Typography sx={{ fontFamily: "EliceBold" }}>
                {"@집밥꼬꼬선생"}
            </Typography>
            <Typography sx={{ fontFamily: "Elice", marginLeft: 1 }}>
                {" 서비스소개 | 이용약관 | 비즈니스 | 공지사항 | 고객센터"}
            </Typography>
        </Box>
    );
}

export default Footer;
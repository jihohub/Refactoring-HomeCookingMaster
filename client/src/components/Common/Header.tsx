/** @jsxImportSource @emotion/react */
import { Link, NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";

import ScrollTop from "./ScrollTop";
import HideOnScroll from "./HideOnScroll";
import mainlogo from "../../assets/hcmk_logo.png";
import logo1line from "../../assets/logo22.png";
import logohat from "../../assets/hatYess.png";
import logonohat from "../../assets/hatNoo.png";
import axios from "axios";
import CssBaseline from "@mui/material/CssBaseline";
import { useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import background from "../../assets/bg2.jpeg";

const styles = {
    "&.MuiFab-secondary": {
        // border: "1px black solid",
        backgroundColor: "#897A5F",
    },
    // "&.MuiButton-text": {
    //     color: "grey",
    // },
    // "&.MuiButton-contained": {
    //     color: "yellow",
    // },
    // "&.MuiButton-outlined": {
    //     color: "brown",
    // },
};

const pages = [
    {
        text: "텍스트검색",
        path: "/result"
    },
    {
        text: "어바웃",
        path: "/about"
    }
];

const notLoggedIn = [
    {
        text: "회원가입",
        path: "register/termsNConditions",
    },
    {
        text: "로그인",
        path: "/login",
    },
];

// const loggedIn = [
//     {
//         text: "마이페이지",
//         path: "/mypage",
//         func: null
//     },
//     {
//         text: "회원정보수정",
//         path: "/modifyInfo",
//         func: null
//     },
//     {
//         text: "로그아웃",
//         path: null,
//         func: handleLog
//     }
// ];

interface Props {
    window?: () => Window;
    children: React.ReactElement;
}

const Header = (props: Props) => {
    const navigate = useNavigate();
    const user_info = useSelector((state:RootStateOrAny) => state.getUserInfo);

    const [logCheck, setLogCheck] = useState<boolean>(false);

    const refreshTkn = sessionStorage.getItem("usrRfshTkn"); // refresh_token
    const accessTkn = sessionStorage.getItem("usrAcsTkn"); // access_token

    useEffect(() => {
        if (refreshTkn) {
            setLogCheck(true);
        } else {
            setLogCheck(false);
        }
    }, [refreshTkn]);

    const handleLogout = async () => {
        const res = await axios.delete("/api/auth/logout", {
            headers: {
                Authorization: "Bearer " + accessTkn,
            },
        });
        console.log("<Header>: logout delete api response", res);
    };

    const handleLog = () => {
        handleLogout();
        console.log("<Header> : logout");
        sessionStorage.removeItem("usrRfshTkn");
        sessionStorage.removeItem("usrAcsTkn");
        navigate("/");
    };

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event: any) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: any) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (page: any) => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = (page: any) => {
        setAnchorElUser(null);
    };

    const loggedIn = [
        {
            text: "마이페이지",
            path: "/mypage",
            func: handleCloseNavMenu,
        },
        {
            text: "회원정보수정",
            path: "/modifyInfo",
            func: handleCloseNavMenu,
        },
        {
            text: "로그아웃",
            path: "/",
            func: handleLog,
        },
    ];

    return (
        <>
            <CssBaseline />
            <HideOnScroll {...props}>
                <AppBar
                    position="fixed"
                    sx={{
                        backgroundImage: `url(${background})`,
                        height: "5rem",
                    }}
                >
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{
                                    mr: 2,
                                    display: { xs: "none", md: "flex" },
                                }}
                            >
                                <img
                                    src={logohat}
                                    style={{
                                        height: "3rem",
                                        cursor: "pointer",
                                        margin: "1rem",
                                        marginTop: "1rem",
                                    }}
                                    onClick={() => navigate("/")}
                                    alt="main logo"
                                />
                            </Typography>
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    display: { xs: "flex", md: "none" },
                                }}
                            >
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    color="inherit"
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorElNav}
                                    anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "left",
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "left",
                                    }}
                                    open={Boolean(anchorElNav)}
                                    onClose={handleCloseNavMenu}
                                    sx={{
                                        display: { xs: "block", md: "none" },
                                    }}
                                >
                                    {pages.map((page, index) => (
                                        <MenuItem
                                            key={index}
                                            onClick={handleCloseNavMenu}
                                        >
                                            <Typography
                                                textAlign="center"
                                                onClick={() =>
                                                    navigate(`${page.path}`)
                                                }
                                            >
                                                {page.text}
                                            </Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                            {/* <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{
                                    flexGrow: 1,
                                    display: { xs: "flex", md: "none" },
                                }}
                            >
                                <img
                                    src={mainlogo}
                                    style={{
                                        height: "40px",
                                        cursor: "pointer",
                                        paddingRight:'5rem'
                                    }}
                                    onClick={() => navigate("/")}
                                    alt="main logo"
                                />
                            </Typography> */}
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    display: { xs: "none", md: "flex" },
                                }}
                            >
                                {pages.map((page, index) => (
                                    // <Button
                                    //     key={index}
                                    //     onClick={handleCloseNavMenu}
                                    //     sx={{
                                    //         my: 2,
                                    //         color: "#897A5F",
                                    //         display: "block",
                                    //     }}
                                    // >
                                    <MenuItem
                                        key={index}
                                        onClick={handleCloseNavMenu}
                                    >
                                        <Typography
                                            textAlign="center"
                                            onClick={() =>
                                                navigate(`${page.path}`)
                                            }
                                            sx={{
                                                color: "#897A5F",
                                                fontSize: "1.2em",
                                                fontFamily: "EliceBold",
                                                fontWeight: "800",
                                            }}
                                            // sx={{
                                            //     my: 2,
                                            //     color: "#897A5F",
                                            //     display: "block",
                                            // }}
                                        >
                                            {page.text}
                                        </Typography>
                                    </MenuItem>
                                    // </Button>
                                ))}
                            </Box>

                            {logCheck ? (
                                <>
                                    <Box sx={{ marginRight: "20px" }}>
                                        <Typography
                                            sx={{
                                                color: "#897A5F",
                                                fontSize: "1rem",
                                                fontFamily: "EliceBold",
                                                fontWeight: "800",
                                            }}
                                        >
                                            {`${user_info.nickname}`}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ flexGrow: 0 }}>
                                        <Tooltip
                                            title={`${user_info.nickname}님의 마이페이지`}
                                        >
                                            <IconButton
                                                onClick={handleOpenUserMenu}
                                                sx={{ p: 0 }}
                                            >
                                                <Avatar
                                                    alt="profile image on the header bar"
                                                    src={user_info.img}
                                                />
                                            </IconButton>
                                        </Tooltip>
                                        <Menu
                                            sx={{ mt: "45px" }}
                                            id="menu-appbar"
                                            anchorEl={anchorElUser}
                                            anchorOrigin={{
                                                vertical: "top",
                                                horizontal: "right",
                                            }}
                                            keepMounted
                                            transformOrigin={{
                                                vertical: "top",
                                                horizontal: "right",
                                            }}
                                            open={Boolean(anchorElUser)}
                                            onClose={handleCloseUserMenu}
                                        >
                                            {loggedIn.map((item, index) => (
                                                <MenuItem
                                                    key={index}
                                                    onClick={item.func}
                                                >
                                                    <Typography
                                                        textAlign="center"
                                                        onClick={() =>
                                                            navigate(
                                                                `${item.path}`
                                                            )
                                                        }
                                                        sx={{
                                                            color: "#897A5F",
                                                        }}
                                                    >
                                                        {item.text}
                                                    </Typography>
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </Box>
                                </>
                            ) : (
                                notLoggedIn.map((item, index) => (
                                    <MenuItem
                                        key={index}
                                        onClick={handleCloseNavMenu}
                                    >
                                        <Typography
                                            textAlign="center"
                                            onClick={() =>
                                                navigate(`${item.path}`)
                                            }
                                            sx={{
                                                color: "#897A5F",
                                                fontSize: "1.2rem",
                                                fontFamily: "EliceBold",
                                                fontWeight: "800",
                                            }}
                                        >
                                            {item.text}
                                        </Typography>
                                    </MenuItem>
                                ))
                            )}
                        </Toolbar>
                    </Container>
                </AppBar>
            </HideOnScroll>
            <Toolbar id="back-to-top-anchor" />
            <ScrollTop {...props}>
                <Fab
                    color="secondary"
                    size="small"
                    aria-label="scroll back to top"
                    sx={styles}
                >
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
        </>
    );
};;;
export default Header;

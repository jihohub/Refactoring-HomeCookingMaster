/** @jsxImportSource @emotion/react */
import { Link, NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ScrollTop from "./ScrollTop";
import HideOnScroll from "./HideOnScroll";
import mainlogo from "../../assets/hcmk_logo.png";
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

    const [logCheck, setLogCheck] = useState<boolean>(false);

    const refreshTkn = sessionStorage.getItem("usrRfshTkn"); // refresh_token
    const accessTkn = sessionStorage.getItem("usrAcsTkn"); // access_token
    const user_img = sessionStorage.getItem("user_img"); // user_img

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
        sessionStorage.removeItem("user_id");
        sessionStorage.removeItem("user_img");
        window.location.replace("/");
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
                <AppBar position="fixed" sx={{ backgroundColor: "pink" }}>
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
                                    src={mainlogo}
                                    style={{
                                        height: "40px",
                                        cursor: "pointer",
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
                            <Typography
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
                                    }}
                                    onClick={() => navigate("/")}
                                    alt="main logo"
                                />
                            </Typography>
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    display: { xs: "none", md: "flex" },
                                }}
                            >
                                {pages.map((page, index) => (
                                    <Button
                                        key={index}
                                        onClick={handleCloseNavMenu}
                                        sx={{
                                            my: 2,
                                            color: "white",
                                            display: "block",
                                        }}
                                    >
                                        <Typography
                                            onClick={() =>
                                                navigate(`${page.path}`)
                                            }
                                        >
                                            {page.text}
                                        </Typography>
                                    </Button>
                                ))}
                            </Box>
                            {logCheck ? (
                                <Box sx={{ flexGrow: 0 }}>
                                    <Tooltip title="Open settings">
                                        <IconButton
                                            onClick={handleOpenUserMenu}
                                            sx={{ p: 0 }}
                                        >
                                            {user_img ? (
                                                <Avatar
                                                    alt="Remy Sharp"
                                                    src={user_img}
                                                />
                                            ) : (
                                                <Avatar
                                                    alt="Remy Sharp"
                                                    src="/static/images/avatar/2.jpg"
                                                />
                                            )}
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
                                                        navigate(`${item.path}`)
                                                    }
                                                >
                                                    {item.text}
                                                </Typography>
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </Box>
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
                >
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
        </>
    );
};;;
export default Header;

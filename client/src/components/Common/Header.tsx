/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import ScrollTop from "./ScrollTop";
import HideOnScroll from "./HideOnScroll";
// import mainlogo from "../../assets/hcmk_logo.png";
// import logo1line from "../../assets/logo22.png";
import logohat from "../../assets/hatYess.png";
// import logonohat from "../../assets/hatNoo.png";
import axios from "axios";
import CssBaseline from "@mui/material/CssBaseline";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../modules/userLogin";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import background from "../../assets/bg2.jpeg";

const styles = {
    "&.MuiFab-secondary": {
        backgroundColor: "#897A5F",
    },
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
interface Props {
    window?: () => Window;
    children: React.ReactElement;
}

const Header = (props: Props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const user_info = useSelector((state: RootStateOrAny) => state.getUserInfo);

    const [logCheck, setLogCheck] = useState<boolean>(false);

    const refreshTkn = sessionStorage.getItem("usrRfshTkn"); // refresh_token
    const accessTkn = sessionStorage.getItem("usrAcsTkn"); // access_token
    const nickname = sessionStorage.getItem("nickname"); // nickname
    const user_img = sessionStorage.getItem("img"); // nickname

    useEffect(() => {
        if (refreshTkn) {
            setLogCheck(true);
            setAnchorElUser(null);
        } else {
            setLogCheck(false);
        }
    }, [refreshTkn]);

    const handleLogout = async () => {
        // const res = await axios.delete("/api/auth/logout", {
        await axios.delete("/api/auth/logout", {
            headers: {
                Authorization: "Bearer " + accessTkn,
            },
        });
        // console.log("<Header>: logout delete api response", res);
    };

    const handleLog = () => {
        handleLogout();
        // console.log("<Header> : logout");
        sessionStorage.clear();
        dispatch(setUser());
        navigate("/");
    };

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event: any) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: any) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const loggedIn = [
        {
            text: "마이페이지",
            path: "/mypage",
            func: handleCloseUserMenu,
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
                                onClick={() => navigate("/")}
                            >
                                <img
                                    src={logohat}
                                    style={{
                                        height: "3rem",
                                        cursor: "pointer",
                                        margin: "1rem",
                                        marginTop: "1rem",
                                    }}
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
                                            onClick={() => {
                                                handleCloseNavMenu();
                                                navigate(`${page.path}`);
                                            }}
                                        >
                                            <Typography
                                                textAlign="center"
                                                sx={{ fontFamily: "Elice" }}
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
                                {pages.map((item, index) => (
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
                                        onClick={() => {
                                            handleCloseNavMenu();
                                            navigate(`${item.path}`);
                                        }}
                                    >
                                        <Typography
                                            textAlign="center"
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
                                            {item.text}
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
                                            {`${nickname}`}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ flexGrow: 0 }}>
                                        <Tooltip
                                            title={
                                                <Typography
                                                    sx={{ fontFamily: "Elice" }}
                                                >
                                                    {`${nickname}님 반가워요!`}
                                                </Typography>
                                            }
                                        >
                                            <IconButton
                                                onClick={handleOpenUserMenu}
                                                sx={{ p: 0 }}
                                            >
                                                {user_img && (
                                                    <Avatar
                                                        alt="profile image on the header bar"
                                                        src={user_img}
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
                                                    onClick={() => {
                                                        item.func();
                                                        navigate(
                                                            `${item.path}`
                                                        );
                                                    }}
                                                >
                                                    <Typography
                                                        textAlign="center"
                                                        sx={{
                                                            color: "#897A5F",
                                                            fontFamily: "Elice",
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
                                        onClick={() => {
                                            handleCloseNavMenu();
                                            navigate(`${item.path}`);
                                        }}
                                    >
                                        <Typography
                                            textAlign="center"
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
};

export default Header;

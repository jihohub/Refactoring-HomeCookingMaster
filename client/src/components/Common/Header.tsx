/** @jsxImportSource @emotion/react */
import { Link, NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { FiMenu, FiX } from 'react-icons/fi';
import mainlogo from "../../assets/hcmk_logo.png"
import { headerStyle, menuStyle, logoImg, navbar,navLink,navItems,menuAll } from "../../css/header_css";
import axios from "axios";

function Header() {
    const [open, setOpen] = useState(false);
    const [logCheck, setLogCheck] = useState<boolean>(false);

    const localID = localStorage.getItem('id')
    const sessionID = sessionStorage.getItem('id')

    useEffect(() => {
        if(localID){
            setLogCheck(true);
        }else{
            setLogCheck(false)
        }
    },[localID])

    const handleLogout = async () => {
        const res = await axios.delete("/api/auth/logout", {
            headers : {
                Authorization: 'Bearer ' + sessionID
            }
        })
        console.log('<Header>: logout delete api response',res)
    }

    const handleLog = () => {
        setOpen(false)
        handleLogout();
        console.log('<Header> : logout')
        localStorage.removeItem('id')
        sessionStorage.removeItem('id')
        // window.location.replace('/')
    }

    return (
        <header css={headerStyle}>
            <div>
                <nav className="navbar" css={navbar}>
                    <div onClick={() => setOpen(!open)} className="nav-icon">
                        {open ? <FiX /> : <FiMenu />}
                    </div>
                    <Link to="/" className="nav-logo" onClick={() => setOpen(false)}>
                        <img src={mainlogo} alt="logo" css={logoImg}/>
                    </Link>
                    <div css={menuAll}>
                        <ul className={open ? "nav-links-menu active" : "nav-links-menu"} css={menuStyle}>
                            <li className="nav-item" css={navItems}>
                                <NavLink to="/about" className="nav-link" onClick={() => setOpen(false)} css={navLink}>
                                    어바웃어스
                                </NavLink>
                            </li>
                            <li className="nav-item" css={navItems}>
                                <NavLink to="/result" className="nav-link" onClick={() => setOpen(false)} css={navLink}>
                                    텍스트 검색
                                </NavLink>
                            </li>
                        </ul>
                        <ul className={open ? "nav-links-login active" : "nav-links-login"} css={menuStyle}>
                            {logCheck ? 
                                <li className="nav-item" css={navItems}>
                                    <NavLink to="/" className="nav-link" onClick={handleLog} css={navLink}>
                                    로그아웃
                                    </NavLink>
                                </li> 
                                : <li className="nav-item" css={navItems}>
                                    <NavLink to="/login" className="nav-link" onClick={() => setOpen(false)} css={navLink}>
                                        로그인
                                    </NavLink>
                                </li>
                            }
                            {logCheck ? 
                                <li className="nav-item" css={navItems}>
                                    <NavLink to="mypage" className="nav-link" onClick={() => setOpen(false)} css={navLink}>
                                        마이페이지
                                    </NavLink>
                                </li>
                                : <li className="nav-item" css={navItems}>
                                    <NavLink to="register/termsNConditions" className="nav-link" onClick={() => setOpen(false)} css={navLink}>
                                        회원가입
                                    </NavLink>
                                </li>
                            }
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Header;

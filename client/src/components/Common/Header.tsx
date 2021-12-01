/** @jsxImportSource @emotion/react */
import { Link, NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { FiMenu, FiX } from 'react-icons/fi';
import mainlogo from "../../assets/hcmk_logo.png"
import { headerStyle, menuStyle, logoImg, navbar,navLink,navItems,menuAll } from "../../css/header_css";

function Header() {
    const [open, setOpen] = useState(false);

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
                            <li className="nav-item" css={navItems}>
                                <NavLink to="/login" className="nav-link" onClick={() => setOpen(false)} css={navLink}>
                                    로그인
                                </NavLink>
                            </li>
                            <li className="nav-item" css={navItems}>
                                <NavLink to="register/termsNConditions" className="nav-link" onClick={() => setOpen(false)} css={navLink}>
                                    회원가입
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Header;

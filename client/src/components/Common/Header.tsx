/** @jsxImportSource @emotion/react */
import { Link, NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { css, jsx } from "@emotion/react";
import { FiMenu, FiX } from 'react-icons/fi';
import mainlogo from "../../assets/mainlogo.png"

const headerStyle = css`
    img {
        margin-right: 20px;
    }

    .navbar {
        height: 5vh;
        display: flex;
        line-height: 5vh;
        // height: 60px;
        // display: flex;
        // line-height: 60px;
        padding: 0 30px;
        box-shadow: -1px -5px 16px 8px rgb(0 0 0 / 24%);

        img {
            height: 5vh;
        }

        a {
            color: #000000;
            display: block;
            text-decoration: none;
        }
    }

    .nav-links-menu {
        display: grid;
        grid-template-columns: repeat(3, auto);
        background-color: white;
        position: relative;
    }

    .nav-links-login {
        display: grid;
        grid-template-columns: repeat(2, auto);
        background-color: white;
        position: absolute;
        float: right;
        right: 20px;
    }

    .nav-item:hover {
        transition: 0.3s all;
        a {
            text-decoration: underline #FF7F27 3px;
        }
    }

    .nav-icon {
        display: none;
        margin: auto 0;
        font-size: 1.6rem;
        cursor: pointer;
    }

    @media screen and (min-width: 768px) and (max-width: 1080px) {
        .navbar {
            position: relative;
            padding: 0 20px;
        }

        li {
            width: 105px;
            text-align: center;
            font-size: 1rem;
        }
    }

    @media screen and (max-width: 768px) {
        img {
            margin-right: 0;
        }
        .navbar {
            position: relative;
            padding: 0 20px;
        }

        .nav-logo {
            margin: 0 auto;
        }

        .nav-links-menu {
            display: none;
            position: absolute;
            text-align: center;
            width: 100%;
            top: 10vh;
            left: -100%;
            transition: 0.5s all;
        }

        .nav-links-login {
            display: none;
            position: absolute;
            text-align: center;
            width: 100%;
            top: 5vh;
            left: -100%;
            transition: 0.5s all;
        }

        .nav-links-menu.active {
            display: flex;
            flex-direction: column;
            left: 0;
            align-items: center;
            z-index: 1;
        }

        .nav-links-login.active {
            display: flex;
            left: 0;
            z-index: 1;
        }

        .nav-icon {
            display: flex;
        }
    }
`;

const menuStyle = css`
    display: flex;
    list-style: none;
    justify-content: space-around;
    font-size: 1.25rem;
    li {
        width: 150px;
        text-align: center;
    }
`;

function Header() {
    const [open, setOpen] = useState(false);

    return (
        <header css={headerStyle}>
            <div>
                <nav className="navbar">
                    <div onClick={() => setOpen(!open)} className="nav-icon">
                        {open ? <FiX /> : <FiMenu />}
                    </div>
                    <Link to="/" className="nav-logo" onClick={() => setOpen(false)}>
                        <img src={mainlogo}/>
                    </Link>
                    <ul className={open ? "nav-links-menu active" : "nav-links-menu"} css={menuStyle}>
                        <li className="nav-item">
                            <NavLink to="/dictionary" className="nav-link" onClick={() => setOpen(false)}>
                                레시피 사전
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/suggestion" className="nav-link" onClick={() => setOpen(false)}>
                                오늘 뭐 먹지?
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/about" className="nav-link" onClick={() => setOpen(false)}>
                                어바웃어스
                            </NavLink>
                        </li>
                    </ul>
                    <ul className={open ? "nav-links-login active" : "nav-links-login"} css={menuStyle}>
                        <li className="nav-item">
                            <NavLink to="/login" className="nav-link" onClick={() => setOpen(false)}>
                                로그인
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/register" className="nav-link" onClick={() => setOpen(false)}>
                                회원가입
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;

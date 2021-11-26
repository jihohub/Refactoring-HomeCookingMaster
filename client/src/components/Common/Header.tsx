/** @jsxImportSource @emotion/react */
import { Link, NavLink } from "react-router-dom";
import { css, jsx } from "@emotion/react";
import mainlogo from "../../assets/mainlogo.png"

const headerStyle = css`
    display: flex;
    justify-content: space-between;
    height: 9%;
    align-items: center;
    line-height: 80px;
    padding: 0 65px;
    box-shadow: -1px -5px 16px 8px rgb(0 0 0 / 24%);

    a {
        color: black;
        display: block;
    }

    h1 {
        font-size: 1.6rem;
        color: black;
        font-weight: bold;
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

const loginStyle = css`
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
    return (
        <header css={headerStyle}>
            <Link to="/">
                <img src={mainlogo} />
            </Link>
            <nav>
                <ul css={menuStyle}>
                    <li>
                        <NavLink to="/dictionary">
                            레시피 사전
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/suggestion">
                            오늘 뭐 먹지?
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/about">
                            어바웃어스
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <nav>
                <ul css={loginStyle}>
                    <li>
                        <NavLink to="/login">
                            로그인
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/register/termsNConditions">
                            회원가입
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;

import { css } from "@emotion/react";


export const logoImg = css`
    height: 10vh;
`;

export const navbar = css`
    display: flex;
    align-items: center;
    background-color: #f8f6f2;
    width: 70vw;
    height: 12vh;
    padding: 0 30px;
    box-shadow: -1px -1px 16px 8px rgb(162 162 162 / 24%);
`;

export const navLink = css`
    color: #000000;
    display: block;
    text-decoration: none;
    :hover{
        text-decoration: underline #EB9944 3px;
    }
`;

// export const navLinksMenu = css`
//     display: grid;
//     grid-template-columns: repeat(3, auto);
//     position: relative;
// `;

// export const navLinksLog = css`
//     display: grid;
//     grid-template-columns: repeat(2, auto);
//     position: absolute;
//     float: right;
//     right: 20px;
// `;

export const navItems = css`
    padding-left: 5%;
    padding-right: 5%;
`;

export const headerStyle = css`
    display: flex;
    justify-content: center;
    margin-top: 3rem;
    margin-bottom: 5rem;
    /* img {
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
    } */

    /* .nav-links-menu {
        display: grid;
        grid-template-columns: repeat(3, auto);
        position: relative;
    }

    .nav-links-login {
        display: grid;
        grid-template-columns: repeat(2, auto);
        position: absolute;
        float: right;
        right: 20px;
    } */

    /* .nav-item:hover {
        transition: 0.3s all;
        a {
            text-decoration: underline #EB9944 3px;
        }
    } */

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

export const menuStyle = css`
    display: flex;
    list-style: none;
    font-size: 1.25rem;
    li {
        width: 150px;
        text-align: center;
    }
`;

export const menuAll = css`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;
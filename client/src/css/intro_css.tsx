import { css } from "@emotion/react";
import { styled } from "@mui/material/styles";

export const Avatar = styled("img")(({ theme }) => ({
    width:'15rem',
    height:'15rem',
    margin:'2%',
    [theme.breakpoints.down("md")]: {
        width:'10rem',
        height:'10rem',
        marginTop:'3%'
    },
}));

export const aboutDiv = css`
    width : 100vw;
    margin-top:10rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    /* overflow: scroll; */
    margin-bottom : 10rem;
`;


export const each = css`
    width:100%;
    display: flex;
    flex-direction: row;
    justify-content:center;
    /* margin-top:3%; */
    margin-bottom:3%;
`;

export const name = css`
    font-weight:600;
    padding-top:4%;
    padding-bottom:4%;
    font-size : 2rem;
`;

export const position = css`
    padding-bottom:4%;
    font-size : 1.5rem;
`;

export const secondDiv = css`
    background-color : white;
    width:50rem;
    padding-top:3rem;
    padding-bottom:3rem;
    /* overflow: scroll; */
    /* padding-right:4rem; */
`;
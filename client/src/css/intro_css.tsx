import { css } from "@emotion/react";
import { styled } from "@mui/material/styles";

export const SearchDiv1 = styled("div")(({ theme }) => ({
    width:'100%',
    display: "flex",
    flexDirection: "row",
    justifyContent:'center', 
    marginLeft:'3%',
    [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        margin:'0',
        padding:'0'
    },
}));

export const SearchDiv2 = styled("div")(({ theme }) => ({
    width:'100%',
    display: "flex",
    flexDirection: "row",
    justifyContent:'center', 
    paddingRight:'5%',
    [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        margin:'0',
        padding:'0'
    },
}));

export const aboutDiv = css`
    width : 100vw;
    height: 100vh;
    /* margin-top:1rem; */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    overflow: scroll;
`;

export const avatar = css`
    padding:3%;
`;

export const name = css`
    font-weight:600;
    padding-top:4%;
    padding-bottom:4%;
`;

export const position = css`
    padding-bottom:4%;
`;

export const secondDiv = css`
    background-color : white;
    width:50rem;
    padding-top:3rem;
    padding-bottom:3rem;
    overflow: scroll;
    /* padding-right:4rem; */
`;
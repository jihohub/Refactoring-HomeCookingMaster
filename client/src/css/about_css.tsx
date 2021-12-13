import { css } from "@emotion/react";
import { styled } from "@mui/material/styles";

export const SearchDiv = styled("div")(({ theme }) => ({
    width:'100%',
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down("md")]: {
        flexDirection: "column"
    },
}));

export const SearchDiv2 = styled("div")(({ theme }) => ({
    width:'100%',
    display: "flex",
    flexDirection:'row', 
    // marginTop:'5rem', 
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down("md")]: {
        flexDirection: "column"
    },
}));

export const goSearch = css`
    display: flex;
    flex-direction:row;
    margin-top: 2rem; 
    /* justifyContent: 'center',
    alignItems: 'center', */
    text-align:center;
`;

export const goSearchTitle = css`
    cursor : pointer;
    :hover{
        color:white;
        font-weight:700;
        transform: scale(1.2);
        transition:.5s;
    }
`;

export const goSearchImg = css`
    cursor : pointer;
    margin-bottom:1rem;
    :hover{
        transform: scale(1.2);
        transition:.5s;
    }
`;

export const aboutDiv = css`
    width : 100vw;
    height: 100vh;
    /* background-color : #b9b7b7; */
    margin-top:1rem;
    scroll-snap-type: y mandatory;
    overflow-y: scroll;
    margin-bottom:1rem;
`;

export const sectionImg = css`
    height: 95%;
    width:100%;
    display: flex;
    /* justify-content: center; */
    align-items: center;
    flex-direction: column;
    color: white;
    font-size: 2rem;
    scroll-snap-align: start;
    background-image:url('https://hcmk-bucket.s3.ap-northeast-2.amazonaws.com/main_page_img/%EB%B6%88%EA%B3%A0%EA%B8%B0%EB%B9%84%EB%B9%94%EB%B0%A5.jfif');
    background-size : cover;
    overflow: hidden;
`

export const sectionOne = css`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #897A5F;
    font-size: 2rem;
    scroll-snap-align: start;
    text-align:center;
`

export const sectionTwo = css`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #897A5F;
    font-size: 2rem;
    scroll-snap-align: start;
    text-align:center;
    @media(min-width: 300px){
        display:flex;
    }
`




export const introDiv = css`
    margin-bottom:10%;
`;

export const section1 = css`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white;
    font-size: 2rem;
    scroll-snap-align: start;
    background-color : #b1a58f;
`

export const sectionDiv = css`
    width:80%;
    height: 70%;
    background-color:#fbfbf9;
    color:#897A5F;
    margin-bottom:5%;
`
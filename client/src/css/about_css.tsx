import { css } from "@emotion/react";

export const aboutDiv = css`
    width : 100vw;
    height: 100vh;
    /* background-color : #b9b7b7; */
    margin-top:1rem;
    scroll-snap-type: y mandatory;
    overflow-y: scroll;
`;

export const section = css`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white;
    font-size: 2rem;
    scroll-snap-align: start;
    text-align:center;
`

export const sectionImg = css`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white;
    font-size: 2rem;
    scroll-snap-align: start;
    background-image:url('https://hcmk-bucket.s3.ap-northeast-2.amazonaws.com/main_page_img/%EB%B9%84%EB%B9%94%EB%B0%A5.jpg');
    background-size : cover;
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
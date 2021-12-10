import { css } from "@emotion/react";

// text searchbar
export const search = css`
    width: 30rem;
    height: 3rem;
    display: flex;
    align-items: center;
`;

export const searchBtn = css`
    width: 3rem;
    height: 3rem;
    background-color: #897A5F;
    color: white;

    :hover{
        background-color: #c7b595;
    }
`;

export const elem = css`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

export const intro = css`
    display: flex;
    justify-content: center;
    margin-right: 21rem;
    padding-bottom: 1rem;
`;

export const toImage = css`
    display: flex;
    justify-content: center;
    margin-left: 61%;
    padding-top: 1.5em;
    width: 10%;
    :hover{
        color:#c7b595;
    }
`;

// item list

export const recipeIntro = css`
    font-size: 20px;
    margin-top: 5rem;
    margin-left: 13rem;
    padding: 1rem;
`;

export const line = css`
    width: 75%;
    height: 7px;
    background-color: #fa9026;
    border: none;
`;

export const itemImg = css`
    height: 20vh;
    width: 15vw;
`;

export const imgList = css`
    display: block;
    flex-direction: row;
    /* width: 50%; */
`;

export const itemStyle = css`
    display: block;
    flex-direction: column;
    margin: 2rem;
    width: 100%;
`;

export const itembtn = css`
    width: 50%;
`;

export const foodName = css`
    font-size: 20px;
`;

export const img = css`
    width:100%;
    height:17rem;
    cursor: pointer;
    box-shadow: 2px 2px 6px gray;
    :hover{
        transform: scale(1.1);
        transition:.5s;
    }
`;
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import character from '../../assets/character.png'

const NotFound = () => {
    return(
        <div style={{marginTop:'1rem'}}>
            <div css={Box}>
                <img src={character} alt="character"></img>
                <h1 style={{fontSize:'4rem', fontFamily:'EliceBold'}}>404</h1>
                <h1 style={{fontSize:'4rem'}}>NOT FOUND</h1>
            </div>
        </div>
    )
}

export default NotFound;

const Box = css`
    width : 100vw;
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
`;
/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

const asd = css`
    background-image: url('../../assets/main.jpg');
    width: 100vw;
    height: 100vh;
    color: #fa9026;
    font-size: 90px;
`

function DictionaryPage() {
    return (
        <div css={asd}>
            DictionaryPage
        </div>
    );
}

export default DictionaryPage;

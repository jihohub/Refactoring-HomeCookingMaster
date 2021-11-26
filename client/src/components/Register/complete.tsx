/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import {Link} from 'react-router-dom';
import { complete, terms_title, line, complete_cnt, to_login, to_login_btn } from "../../css/register_css";
import Button from '@mui/material/Button';

function Complete() {

    return (
        <div css={complete}>
            <h2 css={terms_title}>가입완료</h2>
            <div css={line}></div>
            <div>
                <p css={complete_cnt}>
                    님 환영합니다. 회원가입이 완료되었습니다.<br />
                    로그인 후 이용해주세요.
                </p>
                <Link to="/login" css={to_login}>
                    <Button variant="contained" color="warning" css={to_login_btn}>로그인하러 가기</Button>
                </Link>
            </div>
        </div>
    );
}

export default Complete;

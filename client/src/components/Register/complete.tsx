/** @jsxImportSource @emotion/react */
import {Link} from 'react-router-dom';
import { useLocation } from "react-router";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { complete, terms_title, line, complete_cnt, to_login, to_login_btn,userName } from "../../css/register_css";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const OkButton = styled(Button)({
    backgroundColor: '#897A5F',
    borderColor: '#897A5F',
    '&:hover': {
        backgroundColor: '#ED6C02',
        borderColor: '#ED6C02',
    },
});

function Complete() {
    const location = useLocation();
    console.log(location)

    const userInfo = useSelector(
        (state: RootStateOrAny) => state.registerInfoSlice
    );

    return (
        <div css={complete}>
            <h2 css={terms_title}>가입완료</h2>
            {/* <div css={line}></div> */}
            <div>
                <p css={complete_cnt}>
                    <span css={userName}>{userInfo.nickname}</span> 님 환영합니다!
                    회원가입이 완료되었습니다.
                    <br />
                    로그인 후 이용해주세요.
                </p>
                <Link to="/login" css={to_login}>
                    <OkButton
                        variant="contained"
                        color="warning"
                        css={to_login_btn}
                    >
                        로그인하러 가기
                    </OkButton>
                </Link>
            </div>
        </div>
    );
}

export default Complete;

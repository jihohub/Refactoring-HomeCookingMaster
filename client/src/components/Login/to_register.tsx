/** @jsxImportSource @emotion/react */
import {Link} from 'react-router-dom';
import { to_register,to_register_button,to_register_p } from "../../css/login_css";
import Button from '@mui/material/Button';

function ToRegister() {

    return (
        <div css={to_register}>
            <p css={to_register_p}>아직 회원이 아니신가요?</p>
            <Link to="/register/termsNConditions" css={to_register_button}>
                <Button variant="text" color="warning" sx={{ fontSize: 16,  fontWeight: 'bold' }}>회원가입</Button>
            </Link>
        </div>
    );
}

export default ToRegister;

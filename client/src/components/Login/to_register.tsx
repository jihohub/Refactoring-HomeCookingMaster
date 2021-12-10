/** @jsxImportSource @emotion/react */
import { Link } from 'react-router-dom';
import { to_register, to_register_button, to_register_p } from "../../css/login_css";
import Button from '@mui/material/Button';
// import { styled } from '@mui/material/styles';

function ToRegister() {

    return (
        <div css={to_register}>
            <p css={to_register_p}>아직 회원이 아니신가요?</p>
            <Link to="/register/termsNConditions" css={to_register_button}>
                <Button variant="text" sx={{ fontSize: 16,  fontWeight: 'bold', color:'#897A5F',marginBottom:'1rem'  }}>회원가입</Button>
            </Link>
        </div>
    );
}

export default ToRegister;


// const OkButton = styled(Button)({
//     backgroundColor: '#897A5F',
//     borderColor: '#897A5F',
//     '&:hover': {
//         backgroundColor: '#c7b595',
//         borderColor: '#c7b595',
//     },
// });

/** @jsxImportSource @emotion/react */
import avatar from "../../assets/avatar.png";

const Footer = () => {
    return(
        <div style={{height:'6rem', backgroundColor:'#b4a58a'}}>
            <img 
                src={avatar}
                style={{
                    height: "5rem",
                    cursor: "pointer",
                    margin: '1rem',
                    paddingBottom: '1rem',
                }}
                alt="main avatar"
                />
                <span ><strong>@집밥꼬꼬선생&nbsp;&nbsp; </strong></span>
                <span> 서비스소개 | 이용약관 | 비즈니스 | 공지사항 | 고객센터 </span>
                
        </div>
    )
}

export default Footer;
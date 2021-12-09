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
        </div>
    )
}

export default Footer;
/** @jsxImportSource @emotion/react */
import IntroMe from "../../components/Mypage/IntroMe";
import MyPost from "../../components/Mypage/myPost";
import MyScrap from '../../components/Mypage/myScrap'

function MyPage() {
    return (
        <div style={{marginTop:'10rem', display:'flex',alignContent:'center', justifyContent:'center', marginBottom:'10rem'}}>
            <div style={{backgroundColor:'white', width:'70%', paddingTop:'5rem'}}>
                <IntroMe />
                <MyPost />
                <MyScrap />
            </div>
        </div>
    );
}

export default MyPage;

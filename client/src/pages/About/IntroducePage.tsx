/** @jsxImportSource @emotion/react */
import { aboutDiv,avatar,name,position,secondDiv } from "../../css/intro_css";
import avatar1 from '../../assets/avatar1.png';
import avatar2 from '../../assets/avatar2.png';
import avatar3 from '../../assets/avatar3.png';
import avatar4 from '../../assets/avatar4.png';
import avatar5 from '../../assets/avatar5.png';
import avatar6 from '../../assets/avatar6.png';
import { SearchDiv1,SearchDiv2 } from "../../css/intro_css";

function IntroPage() {
    return (
        <div css={aboutDiv}>
            <div css={secondDiv}>
                <div>
                    <h1 style={{fontFamily:'EliceBold', color:'#897A5F', paddingBottom:'5%'}}>
                        집밥꼬꼬선생<br/>개발자들을 소개합니다.
                    </h1>
                </div>
                {/* <div style={{display:'flex', flexDirection:'row', width:'100%', justifyContent:'center', marginLeft:'3%'}}> */}
                <SearchDiv1>
                    <div css={avatar}>
                        <img src={avatar1} alt="avatar1" ></img>
                        <h2 css={name}>김한별 (리더)</h2>
                        <h4 css={position}>백엔드 담당</h4>
                        <p>- 학습, 결과 데이터 전처리</p>
                        <p>- 웹 크롤링</p>
                        <p>- Docker 개발환경 세팅</p>
                        <p>- API 구현</p>
                    </div>
                    <div css={avatar}>
                        <img src={avatar2} alt="avatar2" ></img>
                        <h2 css={name}>김희재</h2>
                        <h4 css={position}>백엔드 담당</h4>
                        <p>- 아이디어 기획 </p>
                        <p>- 페이지 별 API 구상</p>
                        <p>- 메인, 레시피 페이지 API<br/> 구현 및 DB 설계 </p>
                        <p>- S3 이미지 업로드 및 삭제<br/>  기능 구현</p>
                    </div>
                    <div css={avatar}>
                        <img src={avatar3} alt="avatar3" ></img>
                        <h2 css={name}>나석균</h2>
                        <h4 css={position}>인공지능 및 백엔드 담당</h4>
                        <p>- azure vm(linux) GPU 환경 설정</p>
                        <p>- 이미지 classification<br/> 모델 선정, 학습, 테스트 진행</p>
                    </div>
                    </SearchDiv1>
                {/* </div> */}
                {/* <div style={{display:'flex', flexDirection:'row', width:'100%', justifyContent:'center', marginRight:'3%'}}> */}
                <SearchDiv2>
                    <div css={avatar}>
                        <img src={avatar4} alt="avatar4" ></img>
                        <h2 css={name}>남경민</h2>
                        <h4 css={position}>프론트엔드 담당</h4>
                        <p>- 와이어프레임 제작 </p>
                        <p>- 로그인, 회원가입 기능 구현</p>
                        <p>- 검색 결과 페이지  기능 구현</p>
                        <p>- 페이지 설계</p>
                    </div>
                    <div css={avatar}>
                        <img src={avatar5} alt="avatar5" style={{width:'3.8rem'}}></img>
                        <h2 css={name}>박지호</h2>
                        <h4 css={position}>프론트엔드 담당</h4>
                        <p>- 플로우차트 설계</p>
                        <p>- 와이어프레임 제작</p>
                        <p>- 상단 네비게이션바 구현</p>
                        <p>- 메인 페이지 검색 기능, 랭킹 기능 구현</p>
                        <p>- 리덕스 상태관리 적용</p>
                        <p>- 반응형 페이지 구현</p>
                    </div>
                    <div css={avatar}>
                        <img src={avatar6} alt="avatar6" style={{width:'4rem'}}></img>
                        <h2 css={name}>조승희</h2>
                        <h4 css={position}>인공지능 담당</h4>
                        <p>- 데이터 전처리</p>
                        <p>- 모델 선정, 테스트</p>
                        <p>- 데이터 라벨 정리</p>
                    </div>
                {/* </div> */}
                </SearchDiv2>
            </div>
        </div>
    );
}

export default IntroPage;

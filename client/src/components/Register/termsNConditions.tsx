/** @jsxImportSource @emotion/react */
import { useState, useRef, useEffect } from "react";
import { Link } from 'react-router-dom';
import { terms,line,terms_cnt,terms_title,service_title, service_sub_title, all_agree,btn,agree_btn, select_cnt } from "../../css/register_css";
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import { brown } from '@mui/material/colors';

const OkButton = styled(Button)({
    backgroundColor: '#897A5F',
    borderColor: '#897A5F',
    '&:hover': {
        backgroundColor: '#c7b595',
        borderColor: '#c7b595',
    },
});

function TermsNConditions() {
    // 약관 보기 버튼
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [scroll1, setScroll1] = useState<DialogProps['scroll']>('paper');
    const [scroll2, setScroll2] = useState<DialogProps['scroll']>('paper');

    const handleClickOpen1 = (scrollType: DialogProps['scroll']) => () => {
        setOpen1(true);
        setScroll1(scrollType);
    };

    const handleClose1 = () => {
        setOpen1(false);
    };

    const handleClickOpen2 = (scrollType: DialogProps['scroll']) => () => {
        setOpen2(true);
        setScroll2(scrollType);
    };

    const handleClose2 = () => {
        setOpen2(false);
    };

    const descriptionElementRef1 = useRef<HTMLElement>(null);
    const descriptionElementRef2= useRef<HTMLElement>(null);

    useEffect(() => {
        if (open1) {
            const { current: descriptionElement } = descriptionElementRef1;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
        if (open2) {
            const { current: descriptionElement } = descriptionElementRef2;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open1,open2]);
    
    // const [moreBtn1, setMoreBtn1] = useState<boolean>(false)
    // const [moreBtn2, setMoreBtn2] = useState<boolean>(false)

    // const changeBtn1 = () => {
    //     setMoreBtn1(!moreBtn1)
    // }

    // const changeBtn2 = () => {
    //     setMoreBtn2(!moreBtn2)
    // }

    // const confirmChecked = () => {
    //     if(check1 && check2 && check3){
    //         setCheckAll(true)
    //     }else{
    //         setCheckAll(false)
    //     }
    // }

    

    // 약관 동의 체크 
    const [checkAll, setCheckAll] = useState<boolean>(false);
    const [check1, setCheck1] = useState<boolean>(false);
    const [check2, setCheck2] = useState<boolean>(false);
    const [check3, setCheck3] = useState<boolean>(false);

    useEffect(() => {
        if (check1 && check2 && check3) {
            setCheckAll(true);
        } else {
            setCheckAll(false);
        }
    }, [check1, check2, check3]);

    const handleCheckAll = () => {
        setCheckAll(!checkAll)
        handleCheck()
    }

    const handleCheck1 = () => {
        setCheck1(!check1)
        // confirmChecked();
    }

    const handleCheck2 = () => {
        setCheck2(!check2)
        // confirmChecked();
    }

    const handleCheck3 = () => {
        setCheck3(!check3)
        // confirmChecked();
    }

    useEffect(() => {
        if (check1 && check2 && check3) {
            setCheckAll(true);
        } else {
            setCheckAll(false);
        }
    }, [check1, check2, check3]);

    // 약관 전체 동의 체크
    const handleCheck = () => {
        if(!checkAll){
            setCheck1(true)
            setCheck2(true)
            setCheck3(true)
        }
        else{
            setCheck1(false)
            setCheck2(false)
            setCheck3(false)
        }
    }

    return (
        <div css={terms}>
            <h1 css={terms_title}>약관인증</h1>
            {/* <div css={line}></div> */}
            <div id="agree_box" css={terms_cnt}>
                <p css={service_title}>집밥꼬꼬선생</p>
                <p css={service_sub_title}>서비스 약관에 동의해주세요.</p>
                <div css={all_agree}>
                    <div>
                        <label style={{ cursor: "pointer" }}>
                            <Checkbox
                                id="check_all"
                                color="warning"
                                checked={checkAll}
                                onChange={handleCheckAll}
                                sx={{
                                    color: brown[800],
                                    '&.Mui-checked': {
                                        color: brown[600],
                                    },
                                }}
                            />
                            약관에 모두 동의합니다.
                        </label>
                    </div>
                </div>
                <div css={select_cnt}>
                    <div css={all_agree}>
                        <div>
                            {/* <input type="checkbox" id="check2" />  */}
                            <label style={{ cursor: "pointer" }}>
                                <Checkbox
                                    id="check_one"
                                    color="warning"
                                    checked={check1}
                                    onChange={handleCheck1}
                                    sx={{
                                        color: brown[800],
                                        '&.Mui-checked': {
                                            color: brown[600],
                                        },
                                    }}
                                />
                                [필수] 만 14세 이상입니다.
                            </label>
                        </div>
                    </div>
                    <div css={all_agree}>
                        <div>
                            {/* <input type="checkbox" id="check3" />  */}
                            <label style={{ cursor: "pointer" }}>
                                <Checkbox
                                    id="check_one"
                                    color="warning"
                                    checked={check2}
                                    onChange={handleCheck2}
                                    sx={{
                                        color: brown[800],
                                        '&.Mui-checked': {
                                            color: brown[600],
                                        },
                                    }}
                                />
                                [필수] 이용약관
                            </label>
                            <Button
                                variant="text"
                                onClick={handleClickOpen1("paper")}
                                size="small"
                                sx={{ fontWeight: "bold", color:'#897A5F' }}
                            >
                                보기
                            </Button>
                            <Dialog
                                open={open1}
                                onClose={handleClose1}
                                scroll={scroll1}
                            >
                                <DialogTitle>[필수] 이용약관</DialogTitle>
                                <DialogContent dividers={scroll1 === "paper"}>
                                    <DialogContentText
                                        ref={descriptionElementRef1}
                                        tabIndex={-1}
                                    >
                                        집밥꼬꼬선생 이용약관은 다음과 같은
                                        내용을 담고 있습니다. (2021년 12월 1일
                                        시행)
                                        <br />
                                        제1조(목적) 이 약관은 전기통신사업법령
                                        및 정보통신망이용촉진, 전자상거래 등에
                                        관한 법령에 의하여 집밥꼬꼬선생(이하
                                        "회사"라 합니다)이 제공하는
                                        집밥꼬꼬선생의 서비스(이하 “서비스"라
                                        한다) 이용과 관련하여 회사와 회원과의
                                        권리, 의무 및 책임사항, 기타 필요한
                                        사항을 규정함을 목적으로 합니다.
                                        <br />
                                        제2조(약관의 효력 및 변경) (1) 이 약관은
                                        회사가 그 내용을 서비스 초기 화면을 통해
                                        게시하고 이용자가 이에 동의를 함으로써
                                        효력을 발생합니다. (2) 회사는 합리적인
                                        사유가 있을 경우 약관규제에 관한 법률,
                                        정보통신망 이용촉진 및 정보보호등에 관한
                                        법률 등 관련법을 위배하지 않는 범위에서
                                        본 약관을 변경할 수 있으며, 이 경우
                                        적용일자 및 개정사유를 명시하여
                                        현행약관과 함께 만개의레시피의 서비스
                                        초기 화면에 그 적용일자 7일이전부터
                                        적용일자 전일까지 공지합니다. 다만,
                                        이용자에게 불리하게 약관내용을 변경하는
                                        경우에는 최소한 30일 이상의 사전
                                        유예기간을 두고 공지합니다. (3) 변경된
                                        약관은 그 내용이 법령에 위배되지 않는 한
                                        변경 이전에 회원으로 가입한 이용자에게도
                                        적용됩니다. 변경된 약관에 이의가 있는
                                        회원은 회사가 정한 양식에 따라 언제든지
                                        회원등록을 취소(회원탈퇴)할 수 있으며,
                                        약관의 효력발생일 이후의 계속적인 서비스
                                        이용은 약관의 변경사항에 동의한 것으로
                                        간주됩니다.
                                        <br />
                                        제 3 조 (약관의 명시 및 개정) 1. 회사는
                                        이 약관의 내용을 회사의 상호, 영업소
                                        소재지, 대표자의 성명, 사업자등록번호,
                                        연락처(전화, 팩스, 전자우편주소 등) 등과
                                        함께 회원이 쉽게 확인할 수 있도록 서비스
                                        초기화면 또는 연결화면에 게시합니다. 2.
                                        회사는 합리적인 사유가 발생한 경우에
                                        관련법령에 위배되지 않는 범위 안에서 이
                                        약관을 개정할 수 있고, 시행일자 7일
                                        이전부터 시행일 후 상당한 기간 동안 그
                                        내용을 웹사이트 초기화면에 공지합니다.
                                        회원의 권리의무와 관련하여 불리한 개정인
                                        경우 그 내용을 개별적으로 통지합니다. 3.
                                        개정된 약관에 동의하지 않는 회원은
                                        언제든지 탈퇴할 수 있습니다. 4. 이용자는
                                        스스로 정기적으로 웹을 방문하거나
                                        애플리케이션을 실행하여 약관의
                                        변경사항을 확인하여야 하고, 변경된
                                        약관의 시행일 이후에 회원이 서비스를
                                        계속 이용하는 경우 개정된 약관에 동의한
                                        것으로 간주합니다. 5. 약관의 변경사항을
                                        알지 못하여 발생하는 이용자의 피해는
                                        회사에서 책임지지 않습니다.
                                        <br />
                                        제 4 조 (손해배상) 1. 회사 또는 회사의
                                        피고용인, 대리인, 기타 도급 및 위임
                                        등으로 회사를 대신하여 이용계약을
                                        이행하는 자의 책임 있는 사유로
                                        이용계약의 이행과 관련하여 회원에게
                                        손해가 발생한 경우, 회사는 회원에게
                                        발생한 손해를 배상할 책임이 있습니다. 2.
                                        회원 또는 회원의 피고용인, 대리인, 기타
                                        도급 및 위임 등으로 회원을 대신하여
                                        이용계약을 이행하는 자의 책임 있는
                                        사유로 이용계약의 이행과 관련하여
                                        회사에게 손해가 발생한 경우, 회원은
                                        회사에게 발생한 손해를 배상할 책임이
                                        있습니다.
                                        <br />
                                        제 5 조 (면책조항) 1. 회사는 천재지변,
                                        전쟁 및 기타 이에 준하는 불가항력으로
                                        인하여 서비스를 제공할 수 없는 경우에는
                                        서비스 제공에 대한 책임이 면제됩니다. 2.
                                        회사는 기간통신 사업자가 전기통신
                                        서비스를 중지하거나 정상적으로 제공하지
                                        아니하여 손해가 발생한 경우 책임이
                                        면제됩니다. 3. 회사는 서비스용 설비의
                                        보수, 교체, 정기점검, 공사 등 부득이한
                                        사유로 서비스를 제공하지 못하여 발생한
                                        손해에 대한 책임이 면제됩니다. 4. 회사는
                                        회원의 귀책사유로 인한 서비스 이용의
                                        장애 및 그에 따른 손해에 대하여 책임을
                                        지지 않습니다. 5. 회사는 이용자의 컴퓨터
                                        오류에 의해 손해가 발생한 경우, 또는
                                        회원이 신상정보 및 전자우편 주소를
                                        부실하게 기재하여 손해가 발생한 경우
                                        책임을 지지 않습니다. 6. 회사는 회원이
                                        서비스를 이용하여 기대하는 수익을 얻지
                                        못하거나 상실한 것에 대하여 책임을 지지
                                        않습니다. 7. 회사는 회원이 서비스를
                                        이용하면서 얻은 자료로 인한 손해에
                                        대하여 책임을 지지 않습니다. 또한 회사는
                                        회원이 서비스를 이용하며 타 회원으로
                                        인해 입게 되는 정신적 피해에 대하여
                                        보상할 책임을 지지 않습니다. 8. 회사는
                                        회원이 서비스에 게재한 각종 정보, 자료,
                                        사실의 신뢰도, 정확성 등 내용에 대하여
                                        책임을 지지 않습니다. 9. 회사는 이용자
                                        상호간 및 이용자와 제 3자 상호 간에
                                        서비스를 매개로 발생한 분쟁에 대해
                                        개입할 의무가 없으며, 이로 인한 손해를
                                        배상할 책임도 없습니다. 10. 회사는
                                        무료로 제공하는 서비스의 이용과 관련하여
                                        회원이 손해를 입은 경우 법령에서 정한
                                        경우를 제외하고는 어떠한 책임도 지지
                                        않습니다.
                                        <br />제 6 조 (분쟁해결과 관할법원) 1.
                                        회사는 이용자로부터 제출되는 불만사항 및
                                        의견을 지체 없이 처리하기 위하여
                                        노력합니다. 다만 신속한 처리가 곤란한
                                        경우에는 이용자에게 그 사유와 처리
                                        일정을 통보합니다. 2. 회사와 이용자 간의
                                        분쟁이 발생한 경우 그에 대하여
                                        대한민국의 법령을 적용합니다. 3. 서비스
                                        이용 중 발생한 회사와 이용자 간의 소송은
                                        회사의 본점 소재지를 관할하는 법원을
                                        관할법원으로 합니다.
                                    </DialogContentText>
                                </DialogContent>
                            </Dialog>
                        </div>
                        {/* <p css={moreBtn1 ? more_btn_show : more_btn}></p> */}
                    </div>
                    <div css={all_agree}>
                        <div>
                            {/* <input type="checkbox" id="check4" /> */}
                            <label style={{ cursor: "pointer" }}>
                                <Checkbox
                                    id="check_one"
                                    checked={check3}
                                    onChange={handleCheck3}
                                    sx={{
                                        color: brown[800],
                                        '&.Mui-checked': {
                                            color: brown[600],
                                        },
                                    }}
                                />
                                
                                    [필수] 개인정보 수집 및 이용 동의
                                
                            </label>
                            <Button
                                variant="text"
                                onClick={handleClickOpen2("paper")}
                                size="small"
                                sx={{ fontWeight: "bold", color:'#897A5F' }}
                            >
                                보기
                            </Button>
                            <Dialog
                                open={open2}
                                onClose={handleClose2}
                                scroll={scroll2}
                            >
                                <DialogTitle>
                                    [필수] 개인정보 수집 및 이용 동의
                                </DialogTitle>
                                <DialogContent dividers={scroll2 === "paper"}>
                                    <DialogContentText
                                        ref={descriptionElementRef2}
                                        tabIndex={-1}
                                    >
                                        집밥꼬꼬선생(이하 ‘회사’라 한다)은
                                        개인정보 보호법 제30조에 따라 회사의
                                        서비스를 이용하는 회원(이하 ‘이용자’라
                                        한다) 의 개인정보를 보호하고 이와 관련한
                                        고충을 신속하고 원활하게 처리할 수
                                        있도록 하기 위하여 다음과 같이 개인정보
                                        처리지침을 수립·공개합니다.
                                        <br />
                                        제1조 총칙 １. 개인정보란 생존하는
                                        개인에 관한 정보로서 해당 정보에
                                        포함되어 있는 이름, 연락처 등의 사항에
                                        의하여 개인을 식별할 수 있는 정보를
                                        말합니다. ２. 회사는 이용자의 개인정보를
                                        소중히 취급하며 정보통신망 이용촉진 및
                                        정보보호 등에 관한 법률상의
                                        개인정보보호규정 및 정보통신부가 제정한
                                        개인정보보호지침을 준수하고 있습니다.
                                        회사는 개인정보취급방침을 통하여
                                        이용자가 제공하는 개인정보가 어떠한
                                        목적과 방식으로 이용되고 있으며
                                        개인정보보호를 위해 어떠한 조치가
                                        취해지고 있는지 알려드립니다. ３. 회사는
                                        개인정보취급방침을 홈페이지 첫 화면에
                                        공개함으로써 이용자가 언제나 용이하게
                                        확인할 수 있도록 조치하고 있습니다. ４.
                                        회사는 개인정보취급방침의 지속적인
                                        개선을 위하여 개인정보취급방침을
                                        개정하는데 필요한 절차를 정하고
                                        있습니다.
                                        <br />
                                        제2조 수집하는 개인정보의 항목 및
                                        수집방법 １. 회사는 회원 가입 시 서비스
                                        제공을 위해 필요한 최소한의 개인정보만을
                                        수집합니다. ２. 이용자는 회사의 서비스를
                                        이용하기 위해서 회원 가입 시 개인정보를
                                        입력해야 합니다. 가) 필수항목 :
                                        아이디(ID), 비밀번호, 닉네임,
                                        이메일주소, 성별, 생년월일 나) 선택항목
                                        : 사진, 블로그 주소
                                    </DialogContentText>
                                </DialogContent>
                            </Dialog>
                            {/* <button onClick={changeBtn2}>보기</button> */}
                        </div>
                        {/* <p css={moreBtn2 ? more_btn_show : more_btn}></p> */}
                    </div>
                </div>
                <div>
                    <Link to="/register/userInfo" css={agree_btn}>
                        <OkButton 
                            id="nextBtn" variant="contained" 
                            disabled={checkAll ? false : true} css={btn}
                        >
                            다음
                        </OkButton>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default TermsNConditions;

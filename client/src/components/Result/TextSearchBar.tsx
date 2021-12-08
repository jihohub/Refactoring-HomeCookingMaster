/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Paper, InputBase, Button } from "@mui/material";
import { search,searchBtn,elem,intro,toImage } from "../../css/result_csst";
import { useDispatch,useSelector, RootStateOrAny } from "react-redux";
import { setWord } from "../../modules/search";
import { useNavigate } from "react-router";

export const TextSearchBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userText, setUserText] = useState(''); // 텍스트 검색어

    const handleTextClick = () => {
        // console.log('<textSearchBar> : 검색 버튼 누름, before dispatch')
        dispatch(setWord(userText))
        // console.log('<textSearchBar> : 검색 버튼 누름, after dispatch')
        navigate(`/result?data=${userText}`)
        // console.log('<textSearchBar> : after navigate')
    }

    const handleKeyPress = (e:any) => {
        if(e.key === 'Enter'){
            e.preventDefault();
            handleTextClick();
        }
    }

    return (
        <>
            <div style={{marginBottom:'5rem'}}>
                <p css={intro}>원하는 검색어를 입력해주세요.</p>
                <div css={elem}>
                    <Paper component="form" className="paper" css={search}>
                            <InputBase
                                id="searchInput"
                                sx={{ ml: 4, flex: 1 }}
                                placeholder="예) 김치볶음밥, 된장찌개, 닭볶음탕"
                                onChange={(e) => setUserText(e.target.value)}
                                onKeyPress={handleKeyPress} 
                            />
                    </Paper>
                    <Button
                        className="searchButton"
                        css={searchBtn}
                        onClick={handleTextClick}
                    >
                        검색
                    </Button>
                </div>
                <Link to="/" style={{textDecoration:'none', color:'#ED6C02', fontWeight:'700', fontSize:'16px'}}>
                    <p css={toImage}>
                        이미지 검색
                    </p>
                </Link>
                
            </div>
        </>
    );
}

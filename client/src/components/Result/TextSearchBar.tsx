/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { Link } from "react-router-dom";
import { Paper, InputBase, Button } from "@mui/material";
import { search,searchBtn,elem,intro,toImage } from "../../css/result_csst";
import { useDispatch,useSelector, RootStateOrAny } from "react-redux";
import { setWord } from "../../redux/search";
import { useNavigate } from "react-router";

export const TextSearchBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userText, setUserText] = useState(''); // 텍스트 검색어

    // const handleTextChange = (e:any) => {
    //     setUserText(e.target.value)
    // }

    const handleTextClick = () => {
        console.log('<textSearchBar> : 검색 버튼 누름, before dispatch')
        dispatch(setWord(userText))
        console.log('<textSearchBar> : 검색 버튼 누름, after dispatch')
        navigate(`/result?data=${userText}`)
        console.log('<textSearchBar> : after navigate')
    }

    return (
        <>
            <div>
                <p css={intro}>원하는 검색어를 입력해주세요.</p>
                <div css={elem}>
                    <Paper component="form" className="paper" css={search}>
                            <InputBase
                                sx={{ ml: 4, flex: 1 }}
                                placeholder="예) 김치볶음밥, 된장찌개, 닭볶음탕"
                                inputProps={{ 'aria-label': 'search google maps' }}
                                onChange={(e) => setUserText(e.target.value)}
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
                <p css={toImage}>
                    <Link to="/" style={{textDecoration:'none', color:'blue'}}>
                        이미지 검색
                    </Link>
                </p>
            </div>
        </>
    );
}

/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Paper, InputBase, Button } from "@mui/material";
import { search,searchBtn,elem,intro,toImage } from "../../css/result_csst";
import { useDispatch,useSelector, RootStateOrAny } from "react-redux";
import { setWord } from "../../redux/search";
import { useNavigate } from "react-router";

export const TextSearchBar = () => {
    const [userText, setUserText] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleTextChange = (e:any) => {
        setUserText(e.target.value)
    }

    const searchWord = useSelector((state:RootStateOrAny) => state.searchText.word);

    const handleTextClick = () => {
        console.log('1')
        dispatch(setWord(userText))
        navigate(`/result?data=${searchWord}`)
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
                                    onChange={handleTextChange}
                                />
                        </Paper>
                    {/* <Link to={`/result/${userText}`} style={{textDecoration:'none'}}> */}
                    <Button
                        aria-label="directions"
                        className="searchButton"
                        css={searchBtn}
                        onClick={handleTextClick}
                    >
                        검색
                    </Button>
                    {/* </Link> */}
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

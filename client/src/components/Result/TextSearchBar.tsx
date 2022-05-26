import React, { useState } from "react";
import { Paper, InputBase, Button } from "@mui/material";
import { search,searchBtn,elem,intro,toImage } from "../../css/result_csst";
import { useRouter } from "next/router";

export const TextSearchBar = () => {
    // const dispatch = useDispatch();
    const router = useRouter();

    const [userText, setUserText] = useState(''); // 텍스트 검색어

    // const handleTextClick = () => {
    //     // console.log('<textSearchBar> : 검색 버튼 누름, before dispatch')
    //     dispatch(setWord(userText))
    //     // console.log('<textSearchBar> : 검색 버튼 누름, after dispatch')
    //     router.push(`/result?data=${userText}`);
    //     // console.log('<textSearchBar> : after navigate')
    // }

    // const handleKeyPress = (e:any) => {
    //     if(e.key === 'Enter'){
    //         e.preventDefault();
    //         handleTextClick();
    //     }
    // }

    return (
      <>
        <div style={{ marginBottom: "5rem" }}>
          <p css={intro}>원하는 검색어를 입력해주세요.</p>
          <div css={elem}>
            <Paper component="form" className="paper" css={search}>
              <InputBase
                id="searchInput"
                sx={{ ml: 4, flex: 1 }}
                placeholder="예) 김치볶음밥, 된장찌개, 닭볶음탕"
                onChange={(e) => setUserText(e.target.value)}
                // onKeyPress={handleKeyPress}
              />
            </Paper>
            <Button
              className="searchButton"
              css={searchBtn}
              // onClick={handleTextClick}
            >
              검색
            </Button>
          </div>
          {/* <Link to="/" style={{textDecoration:'none', color:'#897A5F', fontWeight:'700', fontSize:'16px', width:''}}> */}
          <div
            style={{
              width: "80%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <p css={toImage} onClick={() => router.push("/")}>
              이미지로 검색하기
            </p>
          </div>
          {/* </Link> */}
        </div>
      </>
    );
}

/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setImageFile, setPreviewUrl } from "../../modules/searchedImageSlice";

import { Paper, Input, InputBase, Divider, IconButton, Button } from "@mui/material";
import ImageSearchIcon from '@mui/icons-material/ImageSearch';

const SearchBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [imagefile, setImagefile] = useState();
    const [prvUrl, setPrvUrl] = useState <string | ArrayBuffer
        | null>();
    
    const handleUpload = (e: any) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.readAsDataURL(file);

        reader.onload = (e: any) => {
            dispatch(setImageFile(file));
            dispatch(setPreviewUrl(e.target.result));
            navigate("/result");
        }
    };

    let profile_preview: any = null;
    if(imagefile !== '' && typeof prvUrl == "string"){
        profile_preview = <img className='profile_preview' src={prvUrl} alt="preview" />
    }

    return (
        <div>
        <Paper
        component="form"
            sx={{
                p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, borderRadius: '20px'
            }}
        className="paper"
        >
        <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="검색어를 입력하세요."
            inputProps={{ 'aria-label': 'search google maps' }}
        />
        <label htmlFor="contained-button-file">
            <form method="post" action="result" encType="multipart/form-data">
                <input accept="image/*" name="image" id="contained-button-file" multiple type="file" onChange={handleUpload} hidden />
                <IconButton component="span">
                    <ImageSearchIcon />
                </IconButton>
                {/* <input type="submit"></input> */}
            </form>
        </label>
        {/* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" /> */}
        <Button
            sx={{ p: '10px', backgroundColor: 'orange', color: 'white' }}
            aria-label="directions"
            className="searchButton"
            // variant="contained"
        >
            검색
        </Button>
        </Paper>
        {profile_preview}
        </div>
    );
}

export default SearchBar;

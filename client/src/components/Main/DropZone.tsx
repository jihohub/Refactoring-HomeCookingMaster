/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Dropzone from "react-dropzone";
import Box from "@mui/material/Box";
import { useDispatch, useSelector,RootStateOrAny } from "react-redux";
import { getImgResult } from "../../modules/searchByImageSlice";
import Paper from "@mui/material/Paper";
import { GrImage } from "react-icons/gr";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { btn, btnDiv } from "../../css/main_css";

function DropZone() {
    const dispatch = useDispatch();
    
    const handleDrop = (e: any) => {
        const formData = new FormData();
        console.log('formData', e.target.files)
        
        formData.append("img", e.target.files);
        console.log('formData real', formData)
        // dispatch(getImgResult(formData));
    };

    const imgResult = useSelector((state:RootStateOrAny) => state.getResultByImg.list)

    console.log('imgResult', imgResult)

    return (
        <div>
            <Box  sx={{ border: "1px dashed black", width: "30rem", height: "25rem", textAlign:'center' }}>
                <Dropzone>
                    {({ getRootProps, getInputProps }) => (
                        <section
                            {...getRootProps()}
                            style={{
                                width: "100%",
                                height: "100%",
                                backgroundColor: "lightgray",
                                opacity: 0.5,
                            }}
                        >
                            <input {...getInputProps()} />
                            <div>
                                <GrImage css={info} size="70"/>
                                <p>드래그 앤 드롭으로 이미지 파일을 추가하세요.</p>
                            </div>
                        </section>
                    )}
                </Dropzone>
            </Box>
            <div css={btnDiv}>
                    <OkButton
                        id="nextBtn" 
                        variant="contained" 
                        css={btn}
                        onClick={(acceptedFiles) => handleDrop(acceptedFiles)}
                    >
                        검색
                    </OkButton>
                </div>
        </div>
    );
}

export default DropZone;


const info = css`
    margin-top: 9rem;
`;

const OkButton = styled(Button)({
    backgroundColor: '#897A5F',
    borderColor: '#897A5F',
    '&:hover': {
        backgroundColor: '#c7b595',
        borderColor: '#c7b595',
    },
});
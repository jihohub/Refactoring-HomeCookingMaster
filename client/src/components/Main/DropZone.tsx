/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Dropzone from "react-dropzone";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import { postImage } from "../../modules/searchImageSlice";
import Paper from "@mui/material/Paper";
import { GrImage } from "react-icons/gr";

function DropZone() {
    const dispatch = useDispatch();
    const handleDrop = (acceptedFiles: any) => {
        const formData = new FormData();
        formData.append("image", acceptedFiles[0]);
        dispatch(postImage(formData));
    };

    return (
        <Box  sx={{ border: "1px dashed black", width: "30rem", height: "25rem", textAlign:'center' }}>
            <Dropzone onDrop={(acceptedFiles) => handleDrop(acceptedFiles)}>
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
    );
}

export default DropZone;


const info = css`
    margin-top: 9rem;
`;
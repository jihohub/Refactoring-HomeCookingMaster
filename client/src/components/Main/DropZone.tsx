import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Dropzone from "react-dropzone";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import { postImage } from "../../modules/searchImageSlice";
import Paper from "@mui/material/Paper";

function DropZone() {
    const dispatch = useDispatch();
    const handleDrop = (acceptedFiles: any) => {
        const formData = new FormData();
        formData.append("image", acceptedFiles[0]);
        dispatch(postImage(formData));
    };

    return (
        <Box  sx={{ border: "1px dashed black", width: "100%", height: "100%" }}>
            <Dropzone onDrop={(acceptedFiles) => handleDrop(acceptedFiles)}>
                {({ getRootProps, getInputProps }) => (
                    <section
                        {...getRootProps()}
                        style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "white",
                            opacity: 0.5
                        }}
                    >
                        <input {...getInputProps()} />
                        <p>드래그 앤 드롭으로 이미지 파일을 추가하세요.</p>
                    </section>
                )}
            </Dropzone>
        </Box>
    );
}

export default DropZone;

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Dropzone from "react-dropzone";
import { useDispatch } from "react-redux";
import { postImage } from "../../modules/searchImageSlice";

function DropZone() {
    const dispatch = useDispatch();
    const handleDrop = (acceptedFiles: any) => {
        const formData = new FormData();
        formData.append("image", acceptedFiles[0]);
        dispatch(postImage(formData));
    };

    return (
        <Dropzone onDrop={(acceptedFiles) => handleDrop(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
                <section>
                    <div
                        {...getRootProps()}
                        style={{
                            width: "500px",
                            height: "300px",
                            backgroundColor: "white",
                        }}
                    >
                        <input {...getInputProps()} />
                    </div>
                </section>
            )}
        </Dropzone>
    );
}

export default DropZone;

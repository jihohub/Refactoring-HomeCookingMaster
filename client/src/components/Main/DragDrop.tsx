/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

import React, { ChangeEvent, useCallback, useRef, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { setImageFile, setPreviewUrl } from "../../modules/searchedImageSlice";
import maincharacter from "../../assets/maincharacter.png";


interface IFileTypes {
    id: number;
    object: File;
}

const dragDivStyle = css`
    width: 50vw;
    height: 10vh;
`;

const divStyle = css`
    width: 100%;
    height: 100%;
    background-color: #222222;
    font-size: 30px;
    text-align: center;
    color: #faf3bf;
`;

const DragDrop = () => {
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [files, setFiles] = useState<IFileTypes[]>([]);

    const dragRef = useRef<HTMLLabelElement | null>(null);
    const fileId = useRef<number>(0);

    const onChangeFiles = useCallback(
        (e: ChangeEvent<HTMLInputElement> | any): void => {
        let selectFiles: File[] = [];
        let tempFiles: IFileTypes[] = files;

        if (e.type === "drop") {
            selectFiles = e.dataTransfer.files;
        } else {
            selectFiles = e.target.files;
        }

        for (const file of selectFiles) {
            tempFiles = [
            ...tempFiles,
            {
                id: fileId.current++,
                object: file
            }
            ];
        }

        setFiles(tempFiles);
        },
        [files]
    );

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [imagefile, setImagefile] = useState();
    const [previewUrl, setPreviewUrl] = useState<string | ArrayBuffer | null>();
    
    const handleUpload = (e: any) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.readAsDataURL(file);

        reader.onload = (e: any) => {
            dispatch(setImageFile(file));
            dispatch(setPreviewUrl(e.target.result));
            // navigate("/result");
        }
    };

    const handleDropp = (e: any) => {
        console.log("1", e);
        // e.preventDefault();
        // let reader = new FileReader();
        // let file = e.target.files[0];
        // reader.readAsDataURL(file);

        // reader.onload = (e: any) => {
        //     dispatch(setImageFile(file));
        //     dispatch(setPreviewUrl(e.target.result));
        //     navigate("/result");
        // }
    };

    let profile_preview: any = null;
    if (imagefile !== "" && typeof previewUrl == "string") {
        profile_preview = (
            <img className="profile_preview" src={previewUrl} alt="preview" />
        );
    }

    const handleFilterFile = useCallback(
        (id: number): void => {
        setFiles(files.filter((file: IFileTypes) => file.id !== id));
        },
        [files]
    );

    const handleDragIn = useCallback((e: DragEvent): void => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDragOut = useCallback((e: DragEvent): void => {
        e.preventDefault();
        e.stopPropagation();

        setIsDragging(false);
    }, []);

    const handleDragOver = useCallback((e: DragEvent): void => {
        e.preventDefault();
        e.stopPropagation();

        if (e.dataTransfer!.files) {
        setIsDragging(true);
        }
    }, []);

    const handleDrop = useCallback(
        (e: DragEvent): void => {
        e.preventDefault();
        e.stopPropagation();

        onChangeFiles(e);
        setIsDragging(false);
        handleDropp(e);
        },
        [onChangeFiles]
    );

    const initDragEvents = useCallback((): void => {
        if (dragRef.current !== null) {
        dragRef.current.addEventListener("dragenter", handleDragIn);
        dragRef.current.addEventListener("dragleave", handleDragOut);
        dragRef.current.addEventListener("dragover", handleDragOver);
        dragRef.current.addEventListener("drop", handleDrop);
        }
    }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

    const resetDragEvents = useCallback((): void => {
        if (dragRef.current !== null) {
        dragRef.current.removeEventListener("dragenter", handleDragIn);
        dragRef.current.removeEventListener("dragleave", handleDragOut);
        dragRef.current.removeEventListener("dragover", handleDragOver);
        dragRef.current.removeEventListener("drop", handleDrop);
        }
    }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

    useEffect(() => {
        initDragEvents();

        return () => resetDragEvents();
    }, [initDragEvents, resetDragEvents]);

    return (
        <div className="DragDrop" css={dragDivStyle}>
            <input
                type="file"
                id="fileUpload"
                style={{ display: "none" }}
                multiple={true}
                onChange={handleUpload}
            />

            <label
                className={
                    isDragging ? "DragDrop-File-Dragging" : "DragDrop-File"
                }
                htmlFor="fileUpload"
                ref={dragRef}
            >
                <div css={divStyle}>
                    <p>드래그 앤 드롭으로 이미지 파일을 업로드해주세요.</p>
                </div>
            </label>

            <div className="DragDrop-Files">
                {files.length > 0 &&
                    files.map((file: IFileTypes) => {
                        const {
                            id,
                            object: { name },
                        } = file;

                        return (
                            <div key={id}>
                                <div>{name}</div>
                                <div
                                    className="DragDrop-Files-Filter"
                                    onClick={() => handleFilterFile(id)}
                                >
                                    X
                                </div>
                                {profile_preview}
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default DragDrop;

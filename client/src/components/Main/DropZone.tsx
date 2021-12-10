/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect } from "react";
import Dropzone from "react-dropzone";
import Box from "@mui/material/Box";
import { useDispatch, useSelector,RootStateOrAny } from "react-redux";
import { getImgResult, setImgResult } from "../../modules/searchByImageSlice";
// import { setStatus } from "../../modules/checkImg";
import { setSearchImg } from "../../modules/userSearchImg";
import { GrImage } from "react-icons/gr";
import { btnDiv } from "../../css/main_css";
import { useNavigate } from "react-router";
// import { setImageFile,setPreviewUrl } from "../Result/searchedImageSlice";

function DropZone() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // useEffect(() => {
    //     dispatch(getImgResult([]));
    // }, []);

    const handleDrop = (acceptedFiles: any) => {

        // let reader = new FileReader();
        // let file = acceptedFiles[0];
        // const tmp = reader.readAsDataURL(file);

        // reader.onload = (e: any) => {
        //     dispatch(setImageFile(file));
        //     // dispatch(setPreviewUrl(tmp));
        // }

        // console.log('file', acceptedFiles[0])
        const formData = new FormData();
        formData.append("img", acceptedFiles[0]);
        dispatch(getImgResult(formData));       // 이미지 검색 결과
        dispatch(setSearchImg(acceptedFiles[0]));           // 검색한 이미지
    };
    
    const imgResult = useSelector((state:RootStateOrAny) => state.getResultByImg.list)
    // console.log('pleleeeaassseee ---- imgResult', imgResult)

    useEffect(() => {
        if (imgResult) {
            const rateResult = imgResult["equal_rate"];
            // console.log("<imgResult> : imgResult true", rateResult)
            if (
                typeof rateResult == "undefined" ||
                rateResult == null ||
                rateResult === ""
            ) {
                // console.log("<rateResult> : empty")
            } else {
                if (rateResult[0]["rate"] > 0.7) {
                    const result = rateResult[0]["name"];
                    // console.log('<imgResult> : name 처리',result)
                    navigate(`/result?data=${result}`);
                } else {
                    // console.log('<imgResult> : 값 < 0.7')
                    navigate("/result");
                }
            }
        } else {
            // console.log("<imgResult> : imgResult empty")
        }
    }, [imgResult]);


    return (
        <div>
            <Box
                sx={{
                    border: "1px dashed black",
                    width: "30rem",
                    height: "25rem",
                    textAlign: "center",
                }}
            >
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
                                    <GrImage css={info} size="70" />
                                    <p>
                                        드래그 앤 드롭으로 이미지 파일을 추가하세요.
                                    </p>
                                </div>
                            </section>
                        )}
                    </Dropzone>
                </Box>
                <div css={btnDiv}>
                    <p >이미지 업로드시 바로 검색됩니다.</p>
                </div>
            </Box>
        </div>
    );
}

export default DropZone;


const info = css`
    margin-top: 9rem;
`;

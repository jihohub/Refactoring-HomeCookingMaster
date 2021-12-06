import React, { useState } from "react";
import { Box, Paper, TextField, Button, IconButton } from "@mui/material";
import AddAPhotoRoundedIcon from "@mui/icons-material/AddAPhotoRounded";
import { useDispatch } from "react-redux";
import { postReview } from "../../modules/postReviewSlice";

function RecipeBoard() {
    const dispatch = useDispatch();
    const [text, setText] = useState<string>("");
    const formData = new FormData()

    const handleText = (e: any) => {
        setText(e.target.value);
    }

    const handleUpload = (e: any) => {
        const imageFile = e.target.files[0];
        console.log(imageFile);
        formData.set("img", imageFile);
    };

    const handleSubmit = () => {
        formData.append("user_id", "7");
        formData.append("post", text);
        dispatch(postReview(formData));
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                "& > :not(style)": {
                    m: 1,
                    width: "70vw",
                    height: "20vh",
                },
            }}
        >
            <Paper elevation={0}>
                <TextField
                    id="outlined-basic"
                    variant="outlined"
                    sx={{ width: "100%", height: "100%", lineHeight: "100%" }}
                    minRows="5"
                    multiline={true}
                    onChange={handleText}
                />
                <Button variant="contained" onClick={handleSubmit}>
                    등록
                </Button>
                <form id="formElem" encType="multipart/form-data">
                    <label htmlFor="icon-button-file">
                        <input
                            accept="image/*"
                            id="icon-button-file"
                            type="file"
                            style={{ display: "none" }}
                            onChange={handleUpload}
                        />
                        <IconButton
                            aria-label="upload picture"
                            component="span"
                        >
                            <AddAPhotoRoundedIcon />
                        </IconButton>
                    </label>
                </form>
            </Paper>
        </Box>
    );
}

export default RecipeBoard;

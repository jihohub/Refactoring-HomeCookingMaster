import React, { useState, useEffect } from "react";
import { Box, Paper, TextField, Button, IconButton } from "@mui/material";
import AddAPhotoRoundedIcon from "@mui/icons-material/AddAPhotoRounded";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { recipeReview } from "../../modules/recipeReviewSlice";
import { getRecipe } from "../../modules/recipeSlice";

function RecipeBoard(props: any) {
    const dispatch = useDispatch();
    const [text, setText] = useState<string>("");

    const user_id = String(sessionStorage.getItem("user_id")); // user_id
    const id = props.id;
    const formData = new FormData();

    const handleText = (e: any) => {
        setText(e.target.value);
    };

    const handleUpload = (e: any) => {
        const imageFile = e.target.files[0];
        console.log(imageFile);
        formData.set("img", imageFile);
    };

    const handleSubmit = async () => {
        await formData.append("user_id", user_id);
        await formData.append("post", text);
        await dispatch(recipeReview({ formData, id }));
        dispatch(getRecipe(id));
    };

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
                <Button variant="contained" onClick={handleSubmit}>
                    등록
                </Button>
            </Paper>
        </Box>
    );
}

export default RecipeBoard;

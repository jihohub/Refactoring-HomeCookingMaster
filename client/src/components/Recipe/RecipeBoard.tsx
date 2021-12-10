import React, { useState, useEffect } from "react";
import { Box, Paper, TextField, Button, IconButton } from "@mui/material";
import AddAPhotoRoundedIcon from "@mui/icons-material/AddAPhotoRounded";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { recipeReview } from "../../modules/recipeReviewSlice";
import { getRecipe } from "../../modules/recipeSlice";

const styles = {
    "&.MuiButton-root": {
        // border: "1px black solid",
        backgroundColor: "#897A5F",
    },
    // "&.MuiButton-text": {
    //     color: "grey",
    // },
    "&.MuiButton-contained": {
        fontFamily: "Elice",
    },
    // "&.MuiButton-outlined": {
    //     color: "brown",
    // },
};

function RecipeBoard(props: any) {
    const dispatch = useDispatch();
    const [post, setPost] = useState<string>("");

    const recipe_id = props.recipe_id;
    // const user_id = props.user_id;
    const user_id = String(sessionStorage.getItem("user_id")); // user_id
    const formData = new FormData();

    const handleText = (e: any) => {
        setPost(e.target.value);
    };

    const handleUpload = (e: any) => {
        const imageFile = e.target.files[0];
        formData.set("img", imageFile);
    };

    const handleSubmit = async () => {
        await formData.set("user_id", user_id);
        await formData.set("post", post);
        await dispatch(recipeReview({ formData, recipe_id }));
        dispatch(getRecipe({ recipe_id, user_id }));
    };

    return (
        <Box sx={{ width: "70vw", maxWidth: "1080px", margin: "0 auto" }}>
            <Box
                sx={{
                    width: "70vw",
                    maxWidth: "1080px",
                    margin: "0 auto",
                    height: "30px",
                }}
            />
            <TextField
                id="outlined-basic"
                variant="outlined"
                sx={{
                    width: "100%",
                    height: "100%",
                    lineHeight: "100%",
                }}
                minRows="5"
                multiline={true}
                onChange={handleText}
            />
            <Box
                sx={{
                    width: "70vw",
                    maxWidth: "1080px",
                    margin: "0 auto",
                    height: "10px",
                }}
            />
            <form
                id="formElem"
                encType="multipart/form-data"
                style={{ textAlign: "right" }}
            >
                <label htmlFor="icon-button-file">
                    <input
                        accept="image/*"
                        id="icon-button-file"
                        type="file"
                        style={{ display: "none" }}
                        onChange={handleUpload}
                    />
                    <IconButton aria-label="upload picture" component="span">
                        <AddAPhotoRoundedIcon />
                    </IconButton>
                </label>
                <Button variant="contained" sx={styles} onClick={handleSubmit}>
                    등록
                </Button>
            </form>
            <Box
                sx={{
                    width: "70vw",
                    maxWidth: "1080px",
                    margin: "0 auto",
                    height: "30px",
                }}
            />
        </Box>
    );
}

export default RecipeBoard;

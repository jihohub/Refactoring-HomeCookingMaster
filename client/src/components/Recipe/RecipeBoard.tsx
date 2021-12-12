import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { Box, TextField, Button, IconButton } from "@mui/material";
import AddAPhotoRoundedIcon from "@mui/icons-material/AddAPhotoRounded";
import { clearPost, recipeReview } from "../../modules/recipeReviewSlice";
import { getRecipe } from "../../modules/recipeSlice";

const styles = {
    "&.MuiButton-root": {
        backgroundColor: "#897A5F",
    },
    "&.MuiButton-contained": {
        fontFamily: "Elice",
    },
};

function RecipeBoard(props: any) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const [post, setPost] = useState<string>("");    

    const recipe_id = props.recipe_id;
    const user_id = String(sessionStorage.getItem("user_id")); // user_id
    const [imageFile, setImageFile] = useState<any>(null);

    const handleText = (e: any) => {
        setPost(e.target.value);
    };

    const handleUpload = (e: any) => {
        setImageFile(e.target.files[0]);
    };

    useEffect(() => {
        setPost("");
    }, [params]);

    const handleSubmit = () => {
        const formDataPost = new FormData();
        formDataPost.append("img", imageFile);
        formDataPost.append("user_id", user_id);
        formDataPost.append("post", post);
        dispatch(recipeReview({ formDataPost, recipe_id }));
        window.location.reload();
    };

    useEffect(() => {
        dispatch(getRecipe({ recipe_id, user_id }));
    }, [dispatch]);


    return (
        <Box sx={{ width: "70vw", margin: "0 auto" }}>
            <Box
                sx={{
                    width: "70vw",
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
                value={post}
            />
            <Box
                sx={{
                    width: "70vw",
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
                    margin: "0 auto",
                    height: "30px",
                }}
            />
        </Box>
    );
}

export default RecipeBoard;

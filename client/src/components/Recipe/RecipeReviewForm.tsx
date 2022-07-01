import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Box,
  TextField,
  Button,
  Input,
  IconButton,
  TextareaAutosize,
} from "@mui/material";
import AddAPhotoRoundedIcon from "@mui/icons-material/AddAPhotoRounded";
import { useForm } from "react-hook-form";
import useRecipePost from "../../hooks/Recipes/useRecipePost";
import { useRecoilValue } from "recoil";
import { loginInfo } from "../../atom/loginInfo";
import styles from "./RecipeReviewForm.module.scss";

function RecipeReviewForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const loggedin = useRecoilValue(loginInfo);
  const { recipe_id } = router.query;
  const post = watch("post");
  const img = watch("img");
  const { mutate: recipePost, isLoading: recipePostLoading } = useRecipePost();
  const [previewImage, setPreviewImage] = useState<String | ArrayBuffer | null>(
    ""
  );
  const [postImage, setPostImage] = useState<Blob | null>(null);

  const onUploadImage = (e: any) => {
    let reader = new FileReader();
    setPostImage(e.target.files[0]);
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  
  const onSubmit = () => {
    const formData = new FormData();
    formData.append("user_id", String(loggedin.user_id));
    formData.append("post", post);
    postImage && formData.append("img", postImage);
    const access_token = loggedin.access_token;
    recipePost({ recipe_id, formData, access_token });
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.nicknamebox}>
        <p className={styles.nicknamebox__text}>{loggedin.nickname}</p>
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <TextareaAutosize
          className={styles.textbox}
          {...register("post")}
          placeholder="댓글을 남겨보세요"
        />
        <div className={styles.imagebox}>
          {previewImage && (
            <img
              src={previewImage}
              alt="post image"
              className={styles.imagebox__image}
            />
          )}
        </div>
        <div className={styles.attachbox}>
          <IconButton aria-label="upload picture" component="label">
            <input
              className={styles.attachbox__buttonUpload}
              type="file"
              accept="image/png, image/jpeg"
              {...register("img")}
              onChange={(e) => onUploadImage(e)}
            />
            <AddAPhotoRoundedIcon />
          </IconButton>
          <div className={styles.attachbox__submit}>
            <button
              className={styles.attachbox__buttonSubmit}
              onClick={handleSubmit(onSubmit)}
            >
              등록
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RecipeReviewForm;

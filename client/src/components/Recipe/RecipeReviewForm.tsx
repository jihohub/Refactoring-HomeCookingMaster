import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, TextField, Button, IconButton } from "@mui/material";
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
  
  const onSubmit = () => {
    const formData = new FormData();
    formData.append("user_id", String(loggedin.user_id));
    formData.append("post", post);
    img && formData.append("img", img[0]);
    const access_token = loggedin.access_token;
    recipePost({ recipe_id, formData, access_token });
  };

  return (
    <div className={styles.wrap}>
      <p>{loggedin.user_id}</p>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          className={styles.input}
          type="text"
          {...register("post")}
          placeholder="댓글을 남겨보세요"
        />
        <div className={styles.image}></div>
        <div className={styles.attach}>
          <input
            className={styles.attach__buttonUpload}
            type="file"
            accept="image/png, image/jpeg"
            {...register("img")}
          />
          <input
            className={styles.attach__buttonSubmit}
            type="submit"
            onClick={handleSubmit(onSubmit)}
          />
        </div>
      </form>
    </div>
  );
}

export default RecipeReviewForm;

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, TextField, Button, IconButton } from "@mui/material";
import AddAPhotoRoundedIcon from "@mui/icons-material/AddAPhotoRounded";
import { useForm } from "react-hook-form";
import useRecipePost from "../../hooks/Recipes/useRecipePost";
import { useRecoilValue } from "recoil";
import { loginInfo } from "../../atom/loginInfo";

const inputStyles = {
  width: "70%",
  marginLeft: "15%",
  "& legend": { display: "none" },
  "& fieldset": { top: 0 },
  "& label.Mui-focused": {
    opacity: 0,
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "yellow",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#000000",
    },
    "&:hover fieldset": {
      borderColor: "#897A5F",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#897A5F",
    },
  },
};

const disabledInputStyles = {
  width: "70%",
  marginLeft: "15%",
  "& label.Mui-focused": {
    opacity: 0,
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "yellow",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#000000",
    },
    "&:hover fieldset": {
      borderColor: "#897A5F",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#897A5F",
    },
  },
};

const buttonStyles = {
  "&.MuiButton-root": {
    backgroundColor: "#897A5F",
  },
  "&.MuiButton-contained": {
    fontFamily: "Elice",
  },
};

const disabledButtonStyles = {
  "&.MuiButton-root": {
    backgroundColor: "#dddddd",
  },
  "&.MuiButton-contained": {
    fontFamily: "Elice",
  },
};

interface postParameters {
  recipe_id: number | undefined;
  formData: FormData | undefined;
}

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
    <form onSubmit={(e) => e.preventDefault()}>
      <input type="text" {...register("post")} />
      <input type="file" accept="image/png, image/jpeg" {...register("img")} />
      <input type="submit" onClick={handleSubmit(onSubmit)} />
    </form>
  );
}

export default RecipeReviewForm;

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, TextField, Button, IconButton } from "@mui/material";
import AddAPhotoRoundedIcon from "@mui/icons-material/AddAPhotoRounded";

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

function RecipeReviewForm(props: any) {
  const router = useRouter();
  const [post, setPost] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleText = (e: any) => {
    setPost(e.target.value);
  };

  const handleUpload = (e: any) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("user_id", 0);
    formData.append("post", post);
    formData.append("img", imageFile);
    // await dispatch(recipeReview({ formDataPost, recipe_id }));
  };

  return (
    <Box sx={{ width: "70vw", margin: "0 auto" }}>
      <Box
        sx={{
          width: "70vw",
          margin: "0 auto",
          height: "30px",
        }}
      />
      {status === "authenticated" ? (
        <TextField
          variant="outlined"
          sx={inputStyles}
          minRows="5"
          multiline={true}
          onChange={handleText}
          value={post}
        />
      ) : (
        <TextField
          disabled
          label="로그인 후 이용해주세요."
          variant="outlined"
          sx={disabledInputStyles}
          minRows="5"
          multiline={true}
        />
      )}
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
        style={{ width: "70%", marginLeft: "15%", textAlign: "right" }}
      >
        <label htmlFor="icon-button-file">
          {status === "authenticated" ? (
            <>
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
            </>
          ) : (
            <>
              <input
                disabled
                accept="image/*"
                id="icon-button-file"
                type="file"
                style={{ display: "none" }}
                onChange={handleUpload}
              />
              <IconButton
                disabled
                aria-label="disabled upload picture"
                component="span"
              >
                <AddAPhotoRoundedIcon />
              </IconButton>
            </>
          )}
        </label>
        {status === "authenticated" ? (
          <Button variant="contained" sx={buttonStyles} onClick={handleSubmit}>
            등록
          </Button>
        ) : (
          <Button
            disabled
            variant="contained"
            sx={disabledButtonStyles}
            onClick={handleSubmit}
          >
            등록
          </Button>
        )}
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

export default RecipeReviewForm;

import React, { useState } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import ImageIcon from "@mui/icons-material/Image";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  Box,
  Typography,
  Divider,
  Collapse,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Avatar,
  Modal,
  Pagination,
} from "@mui/material";
import { useRecoilValue } from "recoil";
import { loginInfo } from "../../atom/loginInfo";
import useRecipeDelete from "../../hooks/Recipes/useRecipeDelete";
import styles from "./RecipeReviews.module.scss";
function Row(props: any) {
  const loggedin = useRecoilValue(loginInfo);
  const { mutate: recipeDelete, isLoading: recipeDeleteLoading } = useRecipeDelete();  
  const review = props.row;
  const [open, setOpen] = useState<boolean>(false);

  const [openImage, setOpenImage] = useState<boolean>(false);
  const handleOpen = () => setOpenImage(true);
  const handleClose = () => setOpenImage(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const router = useRouter();
  const { recipe_id } = router.query;

  const onButtonClick = (e: any, post_id: number) => {
    e.preventDefault();
    const access_token = loggedin.access_token;
    recipeDelete({ recipe_id, post_id, access_token });
  };

  return (
    <>
      {!open && (
        <ListItemButton onClick={handleClick}>
          <ListItemText
            sx={{ width: "15%", margin: "auto 0" }}
            primary={
              <Box sx={{ display: "flex" }}>
                <Avatar
                  alt="author's profile image"
                  src={review.profile_img}
                  sx={{
                    width: 25,
                    height: 25,
                  }}
                  component="span"
                />
                <Typography sx={{ fontFamily: "Elice", marginLeft: 1 }}>
                  {review.nickname}
                </Typography>
              </Box>
            }
          />
          <ListItemText
            sx={{ width: "70%", textAlign: "left" }}
            primary={
              review.img ? (
                <Box sx={{ display: "flex", width: "70%" }}>
                  <Box sx={{ width: "10%", margin: "auto 0" }}>
                    <IconButton>
                      <ImageIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  <Box sx={{ width: "90%", margin: "auto 0" }}>
                    <Typography sx={{ fontFamily: "Elice" }}>
                      {review.post}
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <Box sx={{ display: "flex", width: "70%" }}>
                  <Box sx={{ width: "10%" }} />
                  <Box sx={{ width: "90%" }}>
                    <Typography sx={{ fontFamily: "Elice" }}>
                      {review.post}
                    </Typography>
                  </Box>
                </Box>
              )
            }
          />
          {review.user_id === loggedin.user_id && <button onClick={(e) => onButtonClick(e, review.id)}>X</button>}
          <ListItemText
            primary={
              <Typography sx={{ fontFamily: "Elice" }}>
                {review.timestamp.split(" ")[0]}
              </Typography>
            }
          />
          <ExpandMore />
        </ListItemButton>
      )}
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding onClick={handleClick}>
          <ListItemButton sx={{ minHeight: "300px" }}>
            <ListItemText
              sx={{ width: "15%", margin: "auto 0" }}
              primary={
                <Box sx={{ display: "flex" }}>
                  <Avatar
                    alt="author's profile image"
                    src={review.profile_img}
                    sx={{
                      width: 25,
                      height: 25,
                    }}
                    component="span"
                  />
                  <Typography
                    sx={{
                      fontFamily: "Elice",
                      marginLeft: 1,
                    }}
                  >
                    {review.nickname}
                  </Typography>
                </Box>
              }
            />
            <ListItemText
              sx={{ width: "70%", textAlign: "left" }}
              primary={
                <Box sx={{ display: "flex", width: "70%" }}>
                  <Box sx={{ width: "10%" }} />
                  <Box sx={{ width: "90%" }}>
                    <Typography sx={{ fontFamily: "Elice" }}>
                      {review.post}
                    </Typography>
                    {review.img && (
                      <img
                        src={review.img}
                        width="100%"
                        alt="big"
                        onClick={handleOpen}
                        style={{ marginTop: "2%" }}
                      />
                    )}
                  </Box>
                </Box>
              }
            />
            {review.user_id === loggedin.user_id && <button onClick={(e) => onButtonClick(e, review.id)}>X</button>}
            <ListItemText
              primary={
                <Typography sx={{ fontFamily: "Elice" }}>
                  {review.timestamp.split(" ")[0]}
                  <br />
                  {review.timestamp.split(" ")[1]}
                </Typography>
              }
            />
            <ExpandLess />
          </ListItemButton>
        </List>
      </Collapse>
      <Modal
        open={openImage}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <img
          src={review.img}
          style={{
            width: "70%",
            maxWidth: "80vw",
            maxHeight: "80%",
            position: "fixed",
            top: "50%",
            left: "30%",
            transform: "translate(-20%, -50%)",
            overflowY: "auto",
          }}
          alt="original"
          onClick={handleClose}
        />
      </Modal>
    </>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    nickname: PropTypes.string.isRequired,
    post: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    img: PropTypes.string,
  }).isRequired,
};

function RecipeReviews({ data }) {
  const [page, setPage] = useState(1);
  const post = data?.post_info;
  const length = data?.post_info?.length;
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  
  return (
    <>
      <Box sx={{ width: "70vw", maxWidth: "1080px", height: "30px" }} />
      <Box sx={{ width: "70vw", maxWidth: "1080px", margin: "0 auto" }}>
        <Typography
          sx={{
            fontSize: "1.75rem",
            color: "#897A5F",
            fontFamily: "Elice",
          }}
        >
          레시피 후기
        </Typography>
      </Box>
      <Box
        sx={{
          width: "70vw",
          maxWidth: "1080px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <Divider />
      </Box>
      {length > 0 ? (
        post.slice(10 * (page - 1), 10 * page).map((item: any) => (
          <>
            <Box
              sx={{
                width: "70vw",
                maxWidth: "1080px",
                height: "10px",
              }}
            />
            <Box
              sx={{
                width: "70vw",
                maxWidth: "1080px",
                margin: "0 auto",
              }}
            >
              <Row key={item.id} row={item} />
            </Box>
          </>
        ))
      ) : (
        <>
          <Box
            sx={{
              width: "70vw",
              maxWidth: "1080px",
              height: "10px",
            }}
          />
          <Box
            sx={{
              width: "70vw",
              maxWidth: "1080px",
              margin: "0 auto",
            }}
          >
            <List>
              <ListItemButton>
                <ListItemText sx={{ textAlign: "center" }}>
                  <Typography sx={{ fontFamily: "Elice" }}>
                    아직 리뷰가 없습니다.
                  </Typography>
                </ListItemText>
              </ListItemButton>
            </List>
          </Box>
        </>
      )}
      <div className={styles.pagination}>
        {length > 0 && (
          <Pagination
            count={Math.ceil(length / 10)}
            page={page}
            onChange={handleChange}
          />
        )}
      </div>
    </>
  );
}

export default RecipeReviews;

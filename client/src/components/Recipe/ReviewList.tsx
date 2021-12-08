/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import ImageIcon from "@mui/icons-material/Image";
import ListSubheader from "@mui/material/ListSubheader";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Box, Typography, Divider, Collapse, IconButton, List, ListItemButton, ListItemText, Modal } from "@mui/material";

function Row(props: any) {
    const review = props.row;
    const [open, setOpen] = useState<boolean>(false);

    const [openImage, setOpenImage] = useState<boolean>(false);
    const handleOpen = () => setOpenImage(true);
    const handleClose = () => setOpenImage(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            {!open && (
                <ListItemButton onClick={handleClick}>
                    <ListItemText primary={review.nickname} />
                    <ListItemText
                        primary={
                            review.img ? (
                                <>
                                    <IconButton>
                                        <ImageIcon fontSize="small" />
                                    </IconButton>
                                    {review.post}
                                </>
                            ) : (
                                review.post
                            )
                        }
                    />
                    <ListItemText primary={review.timestamp.split(" ")[0]} />
                    <ExpandMore />
                </ListItemButton>
            )}
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding onClick={handleClick}>
                    <ListItemButton sx={{ minHeight: "300px" }}>
                        <ListItemText primary={review.nickname} />
                        <ListItemText
                            primary={
                                <>
                                    {review.post}
                                    <br />
                                    {review.img && <img
                                        src={review.img}
                                        width="200px"
                                        alt="big"
                                        onClick={handleOpen}
                                    />
                                    }
                                </>
                            }
                        />
                        <ListItemText primary={review.timestamp.split(" ")[0]} />
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
                        display: "flex",
                        lineHeight: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    alt="original"
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

function ReviewList(props: any) {
    const post = props.post;

    return (
        <>
            <Box sx={{ width: "70vw", height: "30px" }} />
            <Box sx={{ width: "70vw", margin: "0 auto" }}>
                <Typography sx={{ fontSize: "1.5rem", color: "brown" }}>
                    레시피 후기
                </Typography>
            </Box>
            <Box sx={{ width: "70vw", margin: "0 auto", textAlign: "center" }}>
                <Divider />
            </Box>
            {post.length > 0 ? (
                post.map((item: any) => (
                    <>
                        <Box sx={{ width: "70vw", height: "10px" }} />
                        <Box sx={{ width: "70vw", margin: "0 auto" }}>
                            <Row key={item.id} row={item} />
                        </Box>
                    </>
                ))
            ) : (
                <>
                    <Box sx={{ width: "70vw", height: "10px" }} />
                    <Box sx={{ width: "70vw", margin: "0 auto" }}>
                        <List>
                            <ListItemButton>
                                <ListItemText sx={{ textAlign: "center" }}>
                                    아직 리뷰가 없습니다.
                                </ListItemText>
                            </ListItemButton>
                        </List>
                    </Box>
                </>
            )}
        </>
    );
}

export default ReviewList;

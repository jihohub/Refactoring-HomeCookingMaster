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
                    <ListItemText
                        primary={
                            <Typography sx={{ fontFamily: "Elice" }}>
                                {review.nickname}
                            </Typography>
                        }
                    />
                    <ListItemText
                        primary={
                            review.img ? (
                                <Box sx={{ display: "flex" }}>
                                    <IconButton>
                                        <ImageIcon fontSize="small" />
                                    </IconButton>
                                    <Typography sx={{ fontFamily: "Elice" }}>
                                        {review.post}
                                    </Typography>
                                </Box>
                            ) : (
                                <Typography sx={{ fontFamily: "Elice" }}>
                                    {review.post}
                                </Typography>
                            )
                        }
                        sx={{ textAlign: "left" }}
                    />
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
                            primary={
                                <Typography sx={{ fontFamily: "Elice" }}>
                                    {review.nickname}
                                </Typography>
                            }
                        />
                        <ListItemText
                            primary={
                                <>
                                    <Typography sx={{ fontFamily: "Elice" }}>
                                        {review.post}
                                    </Typography>
                                    <br />
                                    {review.img && (
                                        <img
                                            src={review.img}
                                            width="200px"
                                            alt="big"
                                            onClick={handleOpen}
                                        />
                                    )}
                                </>
                            }
                        />
                        <ListItemText
                            primary={
                                <Typography sx={{ fontFamily: "Elice" }}>
                                    {review.timestamp.split(" ")[0]}
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
            {post.length > 0 ? (
                post.map((item: any) => (
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
        </>
    );
}

export default ReviewList;

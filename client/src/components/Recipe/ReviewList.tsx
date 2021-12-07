/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import ImageIcon from "@mui/icons-material/Image";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import Modal from "@mui/material/Modal";

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
            <ListItemButton onClick={handleClick}>
                <ListItemText primary={!open && review.nickname} />
                <ListItemText
                    primary={
                        !open &&
                        (review.img ? (
                            <>
                                <IconButton>
                                    <ImageIcon fontSize="small" />
                                </IconButton>
                                {review.post}
                            </>
                        ) : (
                            review.post
                        ))
                    }
                />
                <ListItemText
                    primary={!open && review.timestamp.split(" ")[0]}
                />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding onClick={handleClick}>
                    <ListItemButton sx={{ pl: 4, minHeight: "300px" }}>
                        <ListItemText primary={open && review.nickname} />
                        <ListItemText
                            sx={{ textAlign: "center" }}
                            primary={
                                open &&
                                (review.img ? (
                                    <>
                                        {review.post}
                                        <br />
                                        <img
                                            src={review.img}
                                            width="60%"
                                            alt="big"
                                            onClick={handleOpen}
                                        />
                                    </>
                                ) : (
                                    review.post
                                ))
                            }
                        />
                        <ListItemText
                            primary={open && review.timestamp.split(" ")[0]}
                        />
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
        <List
            sx={{ width: "100%", maxWidth: "70vw", bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    생생한 리뷰 보기
                </ListSubheader>
            }
        >
            {post.length > 0 ? (
                post.map((item: any) => (
                    <Row key={item.id} row={item} />
                ))
            ) : (
                <TableRow>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="center">아직 리뷰가 없습니다.</TableCell>
                    <TableCell align="center"></TableCell>
                </TableRow>
            )}
        </List>
    );
}

export default ReviewList;

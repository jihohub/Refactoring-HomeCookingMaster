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


function Row(props: any) {
    const { row, index } = props;
    const [open, setOpen] = useState<boolean>(false);

    return (
        <React.Fragment>
            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                <TableCell align="left">{index + 1}</TableCell>
                <TableCell
                    align="left"
                    sx={{ cursor: "pointer" }}
                    onClick={() => setOpen(!open)}
                >
                    {row.img ? (
                        <>
                            {row.post}
                            <ImageIcon />
                        </>
                    ) : (
                        row.post
                    )}
                </TableCell>
                <TableCell align="right">{row.nickname}</TableCell>
                <TableCell align="center">{row.timestamp}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <p style={{ textAlign: "center" }}>{row.post}</p>
                        {row.img && (
                            <div style={{ textAlign: "center" }}>
                                <img src={row.img} alt="big post" />
                            </div>
                        )}
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        nickname: PropTypes.string.isRequired,
        post: PropTypes.string.isRequired,
        timestamp: PropTypes.number.isRequired,
        img: PropTypes.string,
    }).isRequired,
    index: PropTypes.number.isRequired,
};

export default function ReviewListCopy(props: any) {
    const post = props.recipe.post_info;

    return (
        <TableContainer
            component={Paper}
            sx={{ margin: "0 auto", width: "90%" }}
        >
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">번호</TableCell>
                        <TableCell align="left">내용</TableCell>
                        <TableCell align="right">닉네임</TableCell>
                        <TableCell align="center">날짜</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {post.length > 0 ? (
                        post.map((item: any, index: number) => (
                            <Row key={item.id} row={item} index={index} />
                        ))
                    ) : (
                        <TableRow>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="center">
                                아직 리뷰가 없습니다.
                            </TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

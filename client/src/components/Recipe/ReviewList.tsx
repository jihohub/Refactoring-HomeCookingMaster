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
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ImageIcon from "@mui/icons-material/Image";

function createData(
    nickname: string,
    post: string,
    timestamp: string,
    img: string
) {
    return {
        nickname,
        post,
        timestamp,
        img,
    };
}

function Row(props: any) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                <TableCell align="right">{row.id}</TableCell>
                <TableCell align="right">{row.nickname}</TableCell>
                <TableCell align="right">{row.post}</TableCell>
                <TableCell align="right">{row.img && <ImageIcon />}</TableCell>
                <TableCell align="right">{row.timestamp}</TableCell>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                    </IconButton>
                </TableCell>
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
        img: PropTypes.string
    }).isRequired,
};

// const rows = [
//     createData("Frozen yoghurt", 159, 6.0, 24),
//     createData("Ice cream sandwich", 237, 9.0, 37),
//     createData("Eclair", 262, 16.0, 24),
//     createData("Cupcake", 305, 3.7, 67),
//     createData("Gingerbread", 356, 16.0, 49),
// ];

export default function ReviewList(props: any) {
    console.log("게시판", props);
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right">번호</TableCell>
                        <TableCell align="right">닉네임</TableCell>
                        <TableCell align="right">내용</TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right">날짜</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.post &&
                        props.post.map((item: any) => (
                            <Row key={item.id} row={item} />
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

import React from "react";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {logoutUser} from "../../../store/auth/actions"
import {Paper, Avatar, Box, Button} from "@material-ui/core";
import NotesOutlinedIcon from "@material-ui/icons/NotesOutlined";
import AccountBoxOutlinedIcon from "@material-ui/icons/AccountBoxOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import useStyles from "./style";

const Sidebar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    let history = useHistory();

    const handleClickLogout = () => {
        dispatch(logoutUser())
        history.push("/login");
    }

    return (
        <>
            <Avatar alt="user-avatar" src="" className={classes.avatar}/>
            <Paper className={classes.userInfo}>User Name</Paper>
            <hr/>
            <Box m={2}>
                <Button startIcon={<NotesOutlinedIcon/>}>Todo</Button>
            </Box>
            <Box m={2}>
                <Button startIcon={<AccountBoxOutlinedIcon/>}>Account</Button>
            </Box>
            <Box m={2}>
                <Button startIcon={<ExitToAppOutlinedIcon/>} onClick={handleClickLogout}>Logout</Button>
            </Box>
        </>
    );
};

export default Sidebar;

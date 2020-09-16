import {useHistory} from "react-router-dom";
import useStyles from "../ResetPassword/style";
import {Avatar, Button, Container, CssBaseline, Paper, Typography} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React from "react";

const EmailValidate = (props) => {
    const history = useHistory();
    const classes = useStyles();

    const handleClick = () => {
        history.push("login")
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Email confirmation
                </Typography>
                <br/>

                <Paper variant="elevation" elevation={2}>
                    <br/><br/>
                    <Typography variant="subtitle1" align={"center"} gutterBottom>
                        We have sent you a letter.
                        Please check your mail.
                    </Typography>
                    <br/>
                    <Typography variant="subtitle1" align={"center"} gutterBottom>
                        To confirm your e-mail, follow the link that we sent you in the letter.
                    </Typography>
                    <Typography variant="subtitle1" align={"center"} gutterBottom>
                        If it doesn’t appear within a few minutes, check your spam folder.
                    </Typography>
                    <br/>
                </Paper>
            </div>
        </Container>
    );
}

export default EmailValidate;
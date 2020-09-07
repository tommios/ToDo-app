import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import {logIn} from "../../store/auth/actions";
// Material UI components
import {
    Avatar,
    Button,
    CssBaseline,
    Container,
    TextField,
    Link,
    Grid,
    Typography
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from "./style";


const Login = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    let history = useHistory();

    const [user, setUser] = useState({email: "", password: ""});
    useEffect(() => {
        setUser(user);
    }, [user]);

    const handleChange = (key, value) => {
        setUser({
            ...user,
            [key]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(logIn({email: user.email, password: user.password}))
            .then((response) => {
                //console.log('response =====> ', response);
                if (response.action.error) {
                    setUser({email: "", password: ""});
                } else {
                    history.push("/todos");
                }
            }, (error) => {
                console.log('error =====> ', error);
            })

    };


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>

                <Typography component="h1" variant="h5">
                    Login
                </Typography>

                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={user.email || ""}
                        // helperText={errors.email}
                        //error={errors.email ? true : false}
                        onChange={(e) => handleChange("email", e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={user.password || ""}
                        autoComplete="current-password"
                        // helperText={errors.password}
                        //error={errors.password ? true : false}
                        onChange={(e) => handleChange("password", e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                        // disabled={loading || !this.state.email || !this.state.password}
                    >
                        Sign In
                        {/*{loading && <CircularProgress size={30} className={classes.progess}/>}*/}
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                    {/*{errors.general && (*/}
                    {/*    <Typography variant="body2" className={classes.customError}>*/}
                    {/*        {errors.general}*/}
                    {/*    </Typography>*/}
                    {/*)}*/}
                </form>
            </div>
        </Container>
    );
}

export default Login;

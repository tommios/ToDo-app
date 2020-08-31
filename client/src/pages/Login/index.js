import React from 'react';
// Material UI components
import {
    Avatar,
    Button,
    CssBaseline,
    Container,
    CircularProgress,
    TextField,
    Link,
    Grid,
    Typography
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import axios from 'axios';
import useStyles from "./style";



const Login = (props) => {
    const classes = useStyles();
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
                        // helperText={errors.email}
                        //error={errors.email ? true : false}
                        // onChange={this.handleChange}
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
                        autoComplete="current-password"
                        // helperText={errors.password}
                        //error={errors.password ? true : false}
                        // onChange={this.handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        // onClick={this.handleSubmit}
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

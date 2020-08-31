import React from 'react';
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Link,
    Grid,
    Typography,
    Container,
    CircularProgress
} from '@material-ui/core';
import useStyles from "./style";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import axios from 'axios';



const Signup = (props) => {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                name="firstName"
                                autoComplete="firstName"
                                // helperText={errors.firstName}
                                // error={errors.firstName ? true : false}
                                // onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lastName"
                                // helperText={errors.lastName}
                                // error={errors.lastName ? true : false}
                                // onChange={this.handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label="User Name"
                                name="username"
                                autoComplete="username"
                                // helperText={errors.username}
                                // error={errors.username ? true : false}
                                // onChange={this.handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="phoneNumber"
                                label="Phone Number"
                                name="phoneNumber"
                                autoComplete="phoneNumber"
                                pattern="[7-9]{1}[0-9]{9}"
                                // helperText={errors.phoneNumber}
                                // error={errors.phoneNumber ? true : false}
                                // onChange={this.handleChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                // helperText={errors.email}
                                // error={errors.email ? true : false}
                                // onChange={this.handleChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="country"
                                label="Country"
                                name="country"
                                autoComplete="country"
                                // helperText={errors.country}
                                // error={errors.country ? true : false}
                                // onChange={this.handleChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                // helperText={errors.password}
                                // error={errors.password ? true : false}
                                // onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                id="confirmPassword"
                                autoComplete="current-password"
                                // onChange={this.handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        // onClick={this.handleSubmit}
                        // disabled={loading ||
                        // !this.state.email ||
                        // !this.state.password ||
                        // !this.state.firstName ||
                        // !this.state.lastName ||
                        // !this.state.country ||
                        // !this.state.username ||
                        // !this.state.phoneNumber}
                    >
                        Sign Up
                        {/*{loading && <CircularProgress size={30} className={classes.progress} />}*/}
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}

export default Signup;
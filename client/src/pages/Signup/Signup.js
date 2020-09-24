import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useHistory, Redirect} from "react-router-dom";
import {signUp} from "../../store/auth/actions";
import {Formik, Form, Field} from 'formik';
import * as Yup from "yup"
import {
    Avatar,
    Button,
    CssBaseline,
    Link,
    Grid,
    Typography,
    Container,
} from '@material-ui/core';
import Alert from "@material-ui/lab/Alert";
import {TextField} from 'formik-material-ui';
import useStyles from "./style";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';


const validationSchema = Yup.object({
    firstName: Yup.string("Enter a firstName")
        .min(2, "FirstName must contain at least 2 characters")
        .required("FirstName is required"),
    lastName: Yup.string("Enter a lastName")
        .min(2, "LastName must contain at least 2 characters")
        .required("LastName is required"),
    username: Yup.string("Enter a username")
        .min(2, "Username must contain at least 2 characters")
        .required("Username is required"),
    phoneNumber: Yup.number("Enter a phoneNumber")
        .required("PhoneNumber is required"),
    email: Yup.string()
        .email('Invalid email')
        .required('Email is required'),
    country: Yup.string("Enter a country")
        .required("country is required"),
    password: Yup.string("Enter a password")
        .min(6)
        .required("Password is required"),
    confirmPassword: Yup.string("Enter a confirmPassword")
        .oneOf([Yup.ref('password'), null], 'Passwords do not match')
        .required('Password confirm is required')
});

const SignupForm = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    return isAuthenticated ? <Redirect to="/" /> : (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>

                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>

                <Formik
                    initialValues={{
                        firstName: "",
                        lastName: "",
                        username: "",
                        phoneNumber: "",
                        email: "",
                        country: "",
                        password: "",
                        confirmPassword: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, actions) => {
                        dispatch(signUp({...values}))
                            .then((response) => {
                                if (!response.action.error) {
                                    actions.setFieldError('backend', null);
                                    actions.setSubmitting(true);
                                    history.push("/todos");
                                    actions.resetForm();
                                } else {
                                    actions.setFieldError('backend', response.action.error.response.data.message);
                                    actions.setSubmitting(false);
                                }
                            })
                            .catch(error => {
                                actions.setFieldError('backend', error.message);
                            })
                    }}
                >

                    {({
                          submitForm,
                          handleChange,
                          isValid,
                          touched,
                          errors
                      }) => {
                        return <Form>
                            <Grid container spacing={2}>

                                <Grid item xs={12} sm={6}>
                                    <Field
                                        component={TextField}
                                        type="text"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        name="firstName"
                                        autoComplete="firstName"
                                        helperText={touched.firstName ? errors.firstName : ""}
                                        error={touched.firstName && Boolean(errors.firstName)}
                                        onChange={handleChange}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Field
                                        component={TextField}
                                        type="text"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="lastName"
                                        helperText={touched.lastName ? errors.lastName : ""}
                                        error={touched.lastName && Boolean(errors.lastName)}
                                        onChange={handleChange}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Field
                                        component={TextField}
                                        type="text"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="username"
                                        label="Username"
                                        name="username"
                                        autoComplete="username"
                                        helperText={touched.username ? errors.username : ""}
                                        error={touched.username && Boolean(errors.username)}
                                        onChange={handleChange}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Field
                                        component={TextField}
                                        type="tel"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="phoneNumber"
                                        label="Phone Number"
                                        name="phoneNumber"
                                        autoComplete="phoneNumber"
                                        helperText={touched.phoneNumber ? errors.phoneNumber : ""}
                                        error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                                        onChange={handleChange}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Field
                                        component={TextField}
                                        type="email"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        helperText={touched.email ? errors.email : ""}
                                        error={touched.email && Boolean(errors.email)}
                                        onChange={handleChange}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Field
                                        component={TextField}
                                        type="text"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="country"
                                        label="Country"
                                        name="country"
                                        autoComplete="country"
                                        helperText={touched.country ? errors.country : ""}
                                        error={touched.country && Boolean(errors.country)}
                                        onChange={handleChange}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Field
                                        component={TextField}
                                        type="password"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="password"
                                        label="Password"
                                        name="password"
                                        autoComplete="password"
                                        helperText={touched.password ? errors.password : ""}
                                        error={touched.password && Boolean(errors.password)}
                                        onChange={handleChange}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Field
                                        component={TextField}
                                        type="password"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="confirmPassword"
                                        label="Confirm Password"
                                        name="confirmPassword"
                                        autoComplete="confirmPassword"
                                        helperText={touched.confirmPassword ? errors.confirmPassword : ""}
                                        error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>

                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={submitForm}
                                disabled={!isValid}
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

                            {!errors?.backend ?
                                <></>
                                :
                                <Alert
                                    severity="error"
                                    variant="filled"
                                >
                                    {errors.backend}
                                </Alert>

                            }
                        </Form>
                    }}

                </Formik>
            </div>
        </Container>
    )
}

export default SignupForm;
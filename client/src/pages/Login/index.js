import React from 'react';
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {Formik, Form, Field} from 'formik';
import * as Yup from "yup";
// Material UI components
import {
    Avatar,
    Button,
    CssBaseline,
    Container,
    Link,
    Grid,
    Typography
} from '@material-ui/core';
// Formik Material UI components
import {TextField} from 'formik-material-ui';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from "./style";
import {logIn} from "../../store/auth/actions";


const validationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email')
        .required('Email is required'),
    password: Yup.string("Enter a password")
        .min(6)
        .required("Password is required"),
});


const LoginForm = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    let history = useHistory();

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

                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, {setSubmitting, resetForm}) => {
                        setSubmitting(true);
                        console.log("LoginForm values ===> ", values);
                        dispatch(logIn({email: values.email, password: values.password}))
                            .then((response) => {
                                if (!response.action.error) {
                                    history.push("/todos");
                                }
                            }, (error) => {
                                console.log('error =====> ', error);
                            })

                        resetForm();
                        setSubmitting(false);
                    }}
                >
                    {({
                          submitForm,
                          handleChange,
                          isValid,
                          touched,
                          errors
                      }) => {
                        return (
                            <Form className={classes.form}>
                                <Grid item xs={12}>
                                    <Field
                                        component={TextField}
                                        type="email"
                                        //autoFocus
                                        margin="normal"
                                        variant="outlined"
                                        autoComplete="email"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        helperText={touched.email ? errors.email : ""}
                                        error={touched.email && Boolean(errors.email)}
                                        onChange={handleChange}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Field
                                        component={TextField}
                                        type="password"
                                        variant="outlined"
                                        margin="normal"
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

                                <Button
                                    type="button"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={submitForm}
                                    disabled={!isValid}
                                >
                                    Sign In
                                </Button>

                                <Grid container>
                                    <Grid item>
                                        <Link href="signup" variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>

                            </Form>
                        )
                    }
                    }
                </Formik>
            </div>
        </Container>
    );
}

export default LoginForm;
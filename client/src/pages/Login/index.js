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
    Typography,
    TextField as MuiTextField,
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
                    onSubmit={(values, actions, errors) => {

                        dispatch(logIn({email: values.email, password: values.password}))
                            .then((response) => {
                                if (!response.action.error) {
                                    console.log("=========================");
                                    actions.setSubmitting(true);
                                    history.push("/todos");
                                    actions.resetForm();
                                } else {
                                    actions.setFieldError('general', response.action.error.response.data.message);
                                    setTimeout(()=>{
                                        actions.setSubmitting(false);
                                    }, 1000)
                                    // actions.setErrors(response.action.error.response.data.message);
                                    // console.log('LoginForm response.action.error =====> ', response.action.error.response.data.message);
                                    //
                                    // //actions.setFieldError('general', response.action.error.response.data.message);
                                    // console.log("error.message ======> ", errors);
                                    // console.log('01 LoginForm errors =====> ', errors);
                                }
                            })
                            .catch(error => {
                                actions.setFieldError('general', error.message);
                            })
                            .finally(() => {
                                //actions.setSubmitting(false);
                            });
                        //resetForm();
                        //setSubmitting(false);
                    }}
                >
                    {({
                          submitForm,
                          isSubmitting,
                          handleChange,
                          isValid,
                          touched,
                          errors
                      }) => {
                        console.log("errors.general =======> ", errors.general);
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

                                {!isSubmitting ? (
                                    <></>
                                ) : (
                                    <>
                                        <p style={{color: 'red'}}>{errors.general}</p>
                                    </>
                                )}

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
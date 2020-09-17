import React from 'react';
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
//import {useHistory} from "react-router-dom";
import {Formik, Form, Field} from 'formik';
import * as Yup from "yup";
// Material UI components
import {
    Avatar,
    Button,
    CssBaseline,
    Container,
    Grid,
    Typography,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
// Formik Material UI components
import {TextField} from 'formik-material-ui';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from "./style";
import {newPassword} from "../../store/auth/actions";


const validationSchema = Yup.object({
    password: Yup.string("Enter a password")
        .min(6)
        .required("Password is required"),
    confirm: Yup.string("Enter a confirmPassword")
        .oneOf([Yup.ref('password'), null], 'Passwords do not match')
        .required('Password confirm is required')
});


const NewPasswordForm = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {token} = useParams();
    console.log("NewPasswordForm token =====> ", token);
    //let history = useHistory();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>

                <Typography component="h1" variant="h5">
                    New Password
                </Typography>

                <Formik
                    initialValues={{
                        password: "",
                        confirm: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, actions) => {
                        console.log("token ===> ", token);
                        console.log("typeof token ===> ", typeof(token));
                        dispatch(newPassword(token, values.password))
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
                                        type="password"
                                        margin="normal"
                                        variant="outlined"
                                        autoComplete="password"
                                        required
                                        fullWidth
                                        id="password"
                                        label="Password"
                                        name="password"
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
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="confirm"
                                        label="Confirm Password"
                                        name="confirm"
                                        autoComplete="confirm"
                                        helperText={touched.confirm ? errors.confirm : ""}
                                        error={touched.confirm && Boolean(errors.confirm)}
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
                                    Update password
                                </Button>

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
                        )
                    }
                    }

                </Formik>
            </div>
        </Container>
    );
}

export default NewPasswordForm;
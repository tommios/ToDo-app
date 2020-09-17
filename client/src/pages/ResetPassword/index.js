import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {Formik, Form, Field} from 'formik';
import * as Yup from "yup";
// Material UI components
import {
    Avatar,
    Button,
    Paper,
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
import {resetPassword} from "../../store/auth/actions";

const MainResetForm = () => {
    const [state, setState] = useState(true);

    const handleToggle = () => {
        setState(false);
    }

    if (state) {
        return <ResetForm state={state} toggleForm={handleToggle}/>
    } else {
        return <InfoForm/>
    }

}

const validationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email')
        .required('Email is required'),
});


const ResetForm = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {toggleForm} = props;

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>

                <Typography component="h1" variant="h5">
                    Reset your password
                </Typography>
                <Typography variant="subtitle1" align={"center"} gutterBottom>
                    Enter your user account's verified email address and we will send you a password reset link.
                </Typography>
                <Formik
                    initialValues={{
                        email: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, actions)=>{
                        dispatch(resetPassword({email: values.email}))
                        toggleForm();
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

                                <Button
                                    type="button"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={submitForm}
                                    disabled={!isValid}
                                >
                                    Send password reset email
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

const InfoForm = (props) => {
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
                    Reset your password
                </Typography>
                <br/>

                <Paper variant="elevation" elevation={2}>
                    <br/><br/>
                    <Typography variant="subtitle1" align={"center"} gutterBottom>
                        Check your email for a link to reset your password.
                    </Typography>
                    <Typography variant="subtitle1" align={"center"} gutterBottom>
                        If it doesn’t appear within a few minutes, check your spam folder.
                    </Typography>
                    <br/>
                </Paper>

                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleClick}
                >
                    Return to sign in
                </Button>
            </div>
        </Container>
    );
}


export default MainResetForm;
import React, {useState} from 'react';
import {Formik, Form, Field} from 'formik';
import * as Yup from "yup"
import {Grid, Button} from '@material-ui/core';
import {TextField, CheckboxWithLabel} from 'formik-material-ui';
import useStyles from "./style";


const validationSchema = Yup.object({
    title: Yup.string("Enter a title")
        .min(2, "Title must contain at least 2 characters")
        .required("Title is required"),
    body: Yup.string("Enter your description")
});


const TodoForm = (props) => {
    const {formData, onSubmit, onCancel} = props;
    const classes = useStyles();

    const handleSave = (values) => {
        const {title, body, completed} = values;
        onSubmit({
            title,
            body,
            completed,
        });
    };

    const handleCancel = () => {
        onCancel();
    };

    return (
        <Formik
            enableReinitialize={true}
            initialValues={{
                title: formData ? formData.title : "",
                body: formData ? formData.body : "",
                completed: formData ? formData.completed : false,
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                handleSave(values);
            }}
            // onReset={handleCancel}
        >
            {({
                  submitForm,
                  handleChange,
                  isValid,
                  resetForm,
                  touched,
                  errors,
                  values
              }) => {
                return <Form className={classes.form}>
                    <Grid container spacing={2}>

                        <Grid item xs={12}>
                            <Field
                                component={TextField}
                                name="title"
                                label="Title"
                                fullWidth
                                variant="outlined"
                                value={values.title || ""}
                                helperText={touched.title ? errors.title : ""}
                                error={touched.title && Boolean(errors.title)}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Field
                                component={TextField}
                                name="body"
                                label="Description"
                                fullWidth
                                multiline
                                rows={20}
                                rowsMax={25}
                                variant="outlined"
                                value={values.body || ""}
                                helperText={touched.body ? errors.body : ""}
                                error={touched.body && Boolean(errors.body)}
                                onChange={handleChange}
                            >
                                {/*{(props) => <TextField*/}
                                {/*    {...props}*/}
                                {/*    */}

                                {/*/>}*/}
                            </Field>
                        </Grid>

                        <Grid item xs={12}>
                            <Field
                                component={CheckboxWithLabel}
                                type="checkbox"
                                Label={{label: 'Completed'}}
                                name="completed"
                                color="primary"
                                value={values.completed || false}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={9}>
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={submitForm}
                                disabled={!isValid}
                            >
                                {(formData && formData._id) ? "Update" : "Create"}
                            </Button>
                        </Grid>

                        <Grid item xs={3}>
                            <Button
                                type="button"
                                fullWidth
                                color="secondary"
                                variant="contained"
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                        </Grid>

                    </Grid>
                </Form>
            }}
        </Formik>
    );
}

export default TodoForm;
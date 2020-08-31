import React from 'react';
import {Formik, Form, Field} from 'formik';
import * as Yup from "yup"

import {Grid, Button} from '@material-ui/core';
import {TextField, CheckboxWithLabel} from 'formik-material-ui';

const validationSchema = Yup.object({
    title: Yup.string("Enter a title")
        .min(2, "Title must contain at least 2 characters")
        .required("Title is required"),
    body: Yup.string("Enter your description")
});

const NewForm = (props) => {
    const {formData, onSubmit, onCancel} = props;
    //const {title, body, completed} = formData;

    console.log("formData: ======>  ", formData);

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
        // resetForm();
    };

    return (
        <Formik
            enableReinitialize
            initialValues={{
                title: formData ? formData.title : "",
                body: formData ? formData.body : "",
                completed: formData ? formData.completed : false
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                handleSave(values);
                // resetForm({});
            }}
            onReset={handleCancel}
        >
            {({
                  submitForm,
                  handleChange,
                  isValid,
                  resetForm,
                  touched,
                  errors
              }) => {
                return <Form>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Field
                                component={TextField}
                                name="title"
                                type="text"
                                label="Title"
                                variant="outlined"
                                fullWidth
                                helperText={touched.title ? errors.title : ""}
                                error={touched.title && Boolean(errors.title)}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Field
                                component={TextField}
                                type="body"
                                label="Description"
                                name="body"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={20}
                                rowsMax={25}
                                helperText={touched.body ? errors.body : ""}
                                error={touched.body && Boolean(errors.body)}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Field
                                component={CheckboxWithLabel}
                                type="checkbox"
                                Label={{label: 'Completed'}}
                                name="completed"
                                color="primary"
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
                                onClick={resetForm}
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

export default NewForm;
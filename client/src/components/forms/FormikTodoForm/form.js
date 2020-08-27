import React from "react";
import {
    Grid,
    FormControlLabel,
    Button,
    Checkbox,
    TextField,
} from "@material-ui/core";
import useStyles from "../TodoForm/style";

export const Form = (props) => {
    console.log("Form props: ", props);
    const classes = useStyles();

    const {isUpdate} = props;

    const {
        values: {title, body, completed},
        errors,
        touched,
        handleChange,
        isValid,
        setFieldTouched,
        submitForm,
        resetForm
    } = props;

    const change = (name, e) => {
        e.persist();
        handleChange(e);
        setFieldTouched(name, true, false);
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                    id="title"
                    name="title"
                    label="Title"
                    type="text"
                    variant="outlined"
                    fullWidth
                    helperText={touched.title ? errors.title : ""}
                    error={touched.title && Boolean(errors.title)}
                    value={title}
                    onChange={change.bind(null, "title")}
                />
            </Grid>

            <Grid item xs={12}>
                <TextField
                    id="body"
                    name="body"
                    label="Description"
                    type="text"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={20}
                    rowsMax={25}
                    helperText={touched.body ? errors.body : ""}
                    error={touched.body && Boolean(errors.body)}
                    value={body}
                    onChange={change.bind(null, "body")}
                />
            </Grid>

            <Grid item xs={12}>
                <FormControlLabel
                    control={
                        <Checkbox
                            color="primary"
                        />
                    }
                    id="completed"
                    name="completed"
                    label="Completed"
                    value={completed}
                    onChange={change.bind(null, "completed")}
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
                    {isUpdate ? "Update" : "Create"}
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
    )
}
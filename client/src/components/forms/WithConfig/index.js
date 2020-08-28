import {Grid} from "@material-ui/core";
import {Field, Form} from "formik";
import {TextField} from "formik-material-ui";
import * as React from "react";

const formConfig = {
    todoForm: [
        {
            component: {TextField},
            fieldConfigs: {
                name: 'title',
                type: 'text',
                label: 'Title',
                variant: "outlined"
            },
            hasHelperText: (touched, errors) => touched.title ? errors.title : ""
        },
        { name: 'name', title: 'title', label: { label: 'Completed' }, inputFieldType: 'checkbox' },
    ]
}

formConfig.todoForm.map(config => (
    <Grid item xs={12}>
        <Field
            component={config.component}
            {...config.fieldConfigs}
            // name={config.fieldConfigs.name}
            // type={config.fieldConfigs.type}
            // label={config.fieldConfigs.label}
            // variant="outlined"
            fullWidth
            value={formData.title || ""}
            helperText={config.hasHelperText(touched, errors)}
            error={touched.title && Boolean(errors.title)}
        />
    </Grid>
))
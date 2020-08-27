import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup"
import { Form } from "./form";
//import useStyles from "../TodoForm/style";

const validationSchema = Yup.object({
    title: Yup.string("Enter a title")
        .min(2, "Title must contain at least 2 characters")
        .required("Title is required"),
    body: Yup.string("Enter your description")
});


const FormikTodoForm = (props) => {
    //const classes = useStyles();


    const {formData, onSubmit, onCancel} = props;
    // const [todo, setTodo] = useState(original || {});

    // const values = { title: todo.title || "", body: todo.body || "", completed: todo.completed || false};

    // useEffect(() => {
        // setTodo(original || {});
    // }, [original]);

    // const handleChange = (key, value) => {
        // setTodo({
        //     ...todo,
        //     [key]: value,
        // });
    // };

    const handleSave = (data) => {
        const {title, body, completed} = data;
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
                render={props => <Form {...props} isUpdate={formData && formData._id} />}
                initialValues={formData || {}}
                validationSchema={validationSchema}
                onSubmit={(values, formikHelpers) => {
                    console.log('values ====> ', values);
                    handleSave(values);
                }}
                onReset={handleCancel}
                // handleChange={(event) => {
                //     console.log('event', event);
                // }}
            />
    )
}

export default FormikTodoForm;
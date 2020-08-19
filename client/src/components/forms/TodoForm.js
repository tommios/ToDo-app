import React, { useState, useEffect } from "react";
import {
  Grid,
  FormControlLabel,
  Button,
  Checkbox,
  TextField,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const TodoForm = (props) => {
<<<<<<< HEAD
=======
  // console.log("props TodoForm: ", props);
>>>>>>> cb135aaf5845b19088ff96344735d7cf383c13d9
  const classes = useStyles();

  const { formData: original, onSubmit } = props;
  const [todo, setTodo] = useState(original || {});

  useEffect(() => {
    setTodo(original || {});
  }, [original]);

  const handleChange = (key, value) => {
    setTodo({
      ...todo,
      [key]: value,
    });
  };

  const handleSave = (event) => {
    event.preventDefault();
    const { title, body, completed } = todo;
    onSubmit({
      title,
      body,
      completed,
    });
  };

  return (
    <form className={classes.form} noValidate>
      <Grid container spacing={2}>
<<<<<<< HEAD
=======
        {/* <Grid item xs={12} lg={12} sm={12} spacing={2}> */}
>>>>>>> cb135aaf5845b19088ff96344735d7cf383c13d9
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            required
<<<<<<< HEAD
            autoComplete="todoTitle"
=======
>>>>>>> cb135aaf5845b19088ff96344735d7cf383c13d9
            id="title"
            label="Title"
            name="title"
            value={todo.title || ""}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            required
<<<<<<< HEAD
=======
            multiline
            rows={25}
            rowsMax={25}
>>>>>>> cb135aaf5845b19088ff96344735d7cf383c13d9
            name="body"
            label="Description"
            type="text"
            id="body"
<<<<<<< HEAD
            multiline
            rows={20}
            rowsMax={25}
=======
>>>>>>> cb135aaf5845b19088ff96344735d7cf383c13d9
            value={todo.body || ""}
            onChange={(e) => handleChange("body", e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={todo.completed || false}
                onChange={(e) => handleChange("completed", !!e.target.checked)}
                color="primary"
              />
            }
            label="Completed"
          />
        </Grid>
        {/* </Grid> */}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleSave}
        >
          {todo._id ? "Update" : "Create"}
        </Button>
      </Grid>
    </form>
  );
};

export default TodoForm;

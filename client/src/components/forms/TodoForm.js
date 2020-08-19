import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
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
  let history = useHistory();
  const classes = useStyles();

  const { formData: original, onSubmit, onCancel } = props;
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
    const { title, body, completed } = todo;
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
    <form className={classes.form} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            required
            autoComplete="todoTitle"
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
            multiline
            rows={20}
            rowsMax={25}
            name="body"
            label="Description"
            type="text"
            id="body"
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

        <Grid item xs={9}>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSave}
          >
            {todo._id ? "Update" : "Create"}
          </Button>
        </Grid>

        <Grid item xs={3}>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default TodoForm;

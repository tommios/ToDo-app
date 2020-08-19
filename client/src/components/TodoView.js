import React from "react";
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

const TodoView = (props) => {
  let history = useHistory();
  const classes = useStyles();

  const { todo = {}, onEdit } = props;

  const handleCancel = () => {
    history.replace("/todos");
  };

  return todo ? (
    <form className={classes.form} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            readOnly
            autoComplete="todoTitle"
            id="title"
            label="Title"
            name="title"
            value={todo.title || ""}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            readOnly
            multiline
            rows={20}
            rowsMax={25}
            name="body"
            label="Description"
            type="text"
            id="body"
            value={todo.body || ""}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={todo.completed || false}
                color="primary"
                disabled
              />
            }
            label="Completed"
          />
        </Grid>

        <Grid item xs={4}>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={handleCancel}
          >
            Back
          </Button>
        </Grid>

        <Grid item xs={8}>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onEdit}
          >
            Edit Todo
          </Button>
        </Grid>
      </Grid>
    </form>
  ) : (
    "Ops! No todo yet"
  );
};

export default TodoView;

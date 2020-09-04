import React from "react";
import {useHistory}  from "react-router-dom";
import {
  Grid,
  FormControlLabel,
  Button,
  Checkbox,
  TextField,
} from "@material-ui/core";
import useStyles from "./style";

const TodoView = (props) => {
  let history = useHistory();

  const { todo = {}, onEdit } = props;

  const handleCancel = () => {
    history.replace("/todos");
  };

  const classes = useStyles();

  return todo ? (
    <div className={classes.view}>
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
    </div>
  ) : (
    "Ops! No todo yet"
  );
};

export default TodoView;

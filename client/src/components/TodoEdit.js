import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import API from "../api";

import {
  Container,
  Grid,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  Input,
  Button,
  Checkbox,
  TextField,
  CssBaseline,
  Typography,
  Link,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const TodoEdit = (props) => {
  const { todo: original } = props;
  const [todo, setTodo] = useState(original);
  const classes = useStyles();

  const handleChange = (key, value) => {
    setTodo({
      ...todo,
      [key]: value,
    });
  };

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={12} sm={12}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
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
                  control={<Checkbox value="Completed" color="primary" />}
                  label="Completed"
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Save
            </Button>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default TodoEdit;

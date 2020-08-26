import { fade, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    padding: theme.spacing(2),
    textAlign: "center",
    backgroundColor: "#ff5722",
  },
  userInfo: {
    height: "auto",
    padding: theme.spacing(2),
    textAlign: "center",
    backgroundColor: "#ffffff",
  },
  avatar: {
    margin: "auto",
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  control: {
    padding: theme.spacing(2),
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.05),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.15),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  formControlInput: {
    margin: theme.spacing(1),
    width: "80%",
    minWidth: 120,
  },
  formControlSelect: {
    margin: theme.spacing(1),
    width: "15%",
    minWidth: 120,
  },
}));

export default useStyles;

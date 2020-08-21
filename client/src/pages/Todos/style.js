import { makeStyles } from "@material-ui/core/styles";

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
}));

export default useStyles;

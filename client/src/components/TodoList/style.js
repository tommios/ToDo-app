import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  fixed: {
    position: "fixed",
    bottom: theme.spacing(4),
    right: theme.spacing(6),
  },
  completed: {
    opacity: 0.4,
  },
}));

export default useStyles;

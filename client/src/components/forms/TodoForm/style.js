import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(8),
            height: theme.spacing(16),
        },
    },
    view: {
        // width: "100%", // Fix IE 11 issue.
        width: theme.spacing(56),
        margin: "auto",
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default useStyles;
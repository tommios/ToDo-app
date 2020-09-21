import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    userInfo: {
        height: "auto",
        padding: theme.spacing(2),
        textAlign: "center",
        backgroundColor: "#ffffff",
        color: "#0055ff",
        fontSize: "150%",
    },
    avatar: {
        margin: "auto",
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    menu: {
        display: "block",
        padding: "5px",
        textDecoration: "none",
        fontSize: "1rem",

    },
    btn: {
        width: "75%",
        paddingLeft: theme.spacing(3),
        justifyContent: "left",
    },
}));

export default useStyles;

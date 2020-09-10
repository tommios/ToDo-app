import React from 'react';
import {useHistory}  from "react-router-dom";
import useStyles from "./style";
import { withStyles } from '@material-ui/core/styles';
import {
    Button,
    Dialog,
    DialogTitle as MuiDialogTitle,
    DialogContent as MuiDialogContent,
    DialogActions as MuiDialogActions,
    IconButton,
    Typography, TextField
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const styles = (theme) => ({
    root: {
        width: '100%',
        maxWidth: 1000,
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {

    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
}))(MuiDialogActions);


export default function TodoView(props) {
   // const classes = useStyles();
    const history = useHistory();
    const { todo = {}, onEdit } = props;
    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        setOpen(false);
        history.replace("/todos");
    };

    return (
        <div>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {todo.title}
                </DialogTitle>
                <DialogContent dividers>
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
                    {/*<Typography variant="body1" noWrap={false} gutterBottom>*/}
                    {/*    {todo.body}*/}
                    {/*</Typography>*/}
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={onEdit} color="primary">
                        Edit Todo
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
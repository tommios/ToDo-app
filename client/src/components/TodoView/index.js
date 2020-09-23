import React from 'react';
import {useHistory} from "react-router-dom";
import {withStyles} from '@material-ui/core/styles';
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
    view: {
        // width: "100%", // Fix IE 11 issue.
        width: theme.spacing(56),
        margin: "auto",
        marginTop: theme.spacing(3),
    },
});

const DialogTitle = withStyles(styles)((props) => {

    const {children, classes, onClose, ...other} = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon/>
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


const TodoView = (props) => {
    const history = useHistory();
    const {todo = {}, onEdit} = props;
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
                    <p id={'pizdatoe-body'} dangerouslySetInnerHTML={{__html: todo.body}}/>
                    {/*<p id="body">{todo.body}</p>*/}
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

export default TodoView;
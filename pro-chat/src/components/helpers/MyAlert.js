import React, { forwardRef } from 'react'
import MuiAlert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { closeMessage } from '../../store/auth/auth.slice';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MyAlert = () => {
    let open = useSelector(state => state.auth.open)
    let message = useSelector(state => state.auth.message)
    let messageType = useSelector(state => state.auth.status)
    let next = useSelector(state => state.auth.next)
    let dispatch = useDispatch()

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        dispatch(closeMessage())
    }
  return (
    <>
    <Snackbar anchorOrigin={{vertical: "bottom", horizontal: "right"}} open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={messageType ? "success" : "error"} sx={{ width: '100%' }}>
            { message }
        </Alert>
    </Snackbar>
    </>
  )
}

export default MyAlert

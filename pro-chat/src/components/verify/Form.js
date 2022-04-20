import { Button, FormControl, TextField } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import { verifyUserCode } from '../../store/auth/auth.slice';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    formInput: {
        marginBottom: "16px !important",
    },
    buttonColor:{
        backgroundColor: "#ac3dff !important",
        '&:hover': {
            backgroundColor: "#ac3dff !important",
        },
        borderRadius: "20px !important",
        padding: "10px 10px !important"
    }
}));

const Form = () => {
    const classes = useStyles()
    const [code, setCode] = useState('')
    let {message, loading, err} = useSelector(state => state.auth)
    let dispatch = useDispatch()

    const handleCode = (event) => {
        setCode(event.target.value)
    }
    const verifyCode = () => {
        dispatch(verifyUserCode(code))
    }
    return (
        <div>
            <FormControl className={classes.formInput} fullWidth>
                <TextField
                    id="outlined-basic"
                    label="Code"
                    variant="outlined"
                    value={code}
                    onChange = {handleCode}
                    helperText={err ? message: ""}
                    error = {err? true : false}
                />
            </FormControl>
            <FormControl className={classes.formInput} fullWidth>
            {loading ? <LoadingButton className={classes.buttonColor} size="large" loading loadingPosition="end" color="primary" endIcon={<SendIcon />} align="center" variant="outlined">Please Waite...</LoadingButton>
                         : <Button className={classes.buttonColor} endIcon={<SendIcon />} size="large" variant="contained" color="primary" align="center" onClick={verifyCode}>  Next </Button>
                }
            </FormControl>
        </div>
    )
}

export default Form

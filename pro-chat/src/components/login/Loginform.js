import { Button, FormControl, TextField } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import SelectCountry from './SelectCountry';
import { useDispatch, useSelector } from 'react-redux';
import { sendCodeToUser } from '../../store/auth/auth.slice';
import classes from '../../asset/css/login/form.module.css';

const Loginform = () => {
    const [code, setCode] = useState('+20')
    const [number, setNumber] = useState('+20')
    let {message, loading, err} = useSelector(state => state.auth)
    let dispatch = useDispatch()

    const handleNumberChange = (event) => {
        setNumber(event.target.value)
    }
    const sendCode = () => {
        dispatch(sendCodeToUser(number))
    }
    return (
        <div>
            <FormControl className={classes.formInput} fullWidth>
                <SelectCountry number={number} setNumber={setNumber} code={code} setcode={setCode} />
            </FormControl>
            <FormControl className={classes.formInput} fullWidth>
                <TextField
                    id="outlined-basic"
                    label="phone"
                    variant="outlined"
                    value={number}
                    onChange = {handleNumberChange}
                    helperText={err ? message: ""}
                    error = {err? true : false}
                />
            </FormControl>
            <FormControl className={classes.formInput} fullWidth>
                {loading ? <LoadingButton className={classes.buttonColor} size="large" loading loadingPosition="end" color="primary" endIcon={<SendIcon />} align="center" variant="outlined">Please Waite...</LoadingButton>
                         : <Button className={classes.buttonColor} endIcon={<SendIcon />} size="large" variant="contained" color="primary" align="center" onClick={sendCode}>  Next </Button>
                }

            </FormControl>
        </div>
    )
}

export default Loginform

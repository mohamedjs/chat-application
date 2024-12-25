import { makeStyles } from '@mui/styles';
import React from 'react'
import { useSelector } from 'react-redux';
import classes from '../../asset/css/verify/info.module.css';

const Info = () => {
    let phone = useSelector(state => state.auth.phone)
    return (
        <div>
            <h2>{phone}</h2>
            <p className={classes.note}>
                We've sent the code to the Telegram app on your other device.
            </p>
        </div>
    )
}

export default Info

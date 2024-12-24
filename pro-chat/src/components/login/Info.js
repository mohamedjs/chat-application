import { makeStyles } from '@mui/styles';
import React from 'react'
import classes from '../../asset/css/login/info.module.css'

const Info = () => {
    return (
        <div>
            <h2>Ratatouille</h2>
            <p className={classes.note}>
                Please confirm your country code and enter your phone number.
            </p>
        </div>
    )
}

export default Info

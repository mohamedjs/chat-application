import { makeStyles } from '@mui/styles';
import React from 'react'

const useStyles = makeStyles((theme) => ({
    note: {
        color: "rgb(170,170,170)",
        fontSize: "1.1rem",
        marginBottom: "3rem",
        lineHeight: "1.35",
    },
}));

const Info = () => {
    const classes = useStyles();
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

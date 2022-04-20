import { makeStyles } from '@mui/styles';
import React from 'react'
import { useSelector } from 'react-redux';

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

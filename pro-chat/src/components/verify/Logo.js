import React from 'react'
import { makeStyles } from "@mui/styles"
import logoImg from "../../asset/img/happy.gif"

const useStyles = makeStyles((theme) => ({
    logo: {
        width: "14rem",
        height: "11rem",
        margin: "0 auto",
    },
    img: {
        width: "100%",
    },
}));

const Logo = () => {
    const classes = useStyles();
    return (
        <div className={classes.logo}>
            <img src={logoImg} className={classes.img} alt="" />
        </div>
    )
}

export default Logo

import React from 'react'
import { makeStyles } from "@mui/styles"
import logoImg from "../../asset/img/logo.png"
import classes from '../../asset/css/login/logo.module.css'

const Logo = () => {
    return (
        <div className={classes.logo}>
            <img src={logoImg} className={classes.img} alt="" />
        </div>
    )
}

export default Logo

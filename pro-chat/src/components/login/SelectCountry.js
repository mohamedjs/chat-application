import { InputLabel, MenuItem, Select } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadCountries } from '../../store/countries/countries.action'

const useStyles = makeStyles((theme) => ({
    MenuItem: {
        width: "100%",
        background: "none",
        border: "none !important",
        boxShadow: "none !important",
        outline: "none !important",
        display: "flex",
        padding: "0.75rem 1rem",
        position: "relative",
        overflow: "hidden",
        lineHeight: "1.5rem",
        whiteSpace: "nowrap",
        cursor: "pointer",
    },
    countryFlag: {
        fontSize: "2rem",
        marginRight: "2rem",
    },
    countryName: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        marginRight: "1rem",
        textAlign: "left",
    },
    countryCode: {
        opacity: ".5",
    },
    emoji: {
        width: "2rem",
        height: "2rem",
        display: "inlineBlock",
        verticalAlign: "4px",
        margin: "-0.5rem 0.125rem",
    },
}));

const SelectCountry = ({number, setNumber, code, setcode}) => {
    const classes = useStyles()
    const allcountry = useSelector(state => state.countries.countries)
    let dispatch = useDispatch()
    const countries = localStorage.getItem('countries') ? JSON.parse(localStorage.getItem('countries'))
                                                        : allcountry

    useEffect(() => {
        if(!localStorage.getItem('countries')){
            dispatch(loadCountries())
        }
    }, [])

    const handleChange = (event) => {
        setcode(event.target.value)
        setNumber(event.target.value)
    };
    return (
        <div>
            <InputLabel id="demo-simple-select-helper-label">
                    Countries
            </InputLabel>
            <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="countries"
                value={code}
                fullWidth
                onChange={handleChange}
                MenuProps={{
                    PaperProps: {
                        sx: {
                            bgcolor: "rgb(33 33 33)",
                            color: "white",
                        },
                    },
                }}
            >
                {countries.map((country, index) => (
                    <MenuItem key={index} value={country.idd.root+country.idd.suffixes}>
                        <div
                            role="button"
                            tabIndex="0"
                            className={classes.MenuItem}
                        >
                            <span className={classes.countryFlag}>
                                <img className={classes.emoji} src={country.flags.png} alt="🇦🇫" />
                            </span>
                            <span className={classes.countryName}>
                                {country.name.common}
                            </span>
                            <span className={classes.countryCode}>{country.idd.root+country.idd.suffixes}</span>
                        </div>
                    </MenuItem>
                ))}
            </Select>
        </div>
    )
}

export default SelectCountry

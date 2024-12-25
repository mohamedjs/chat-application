import { InputLabel, MenuItem, Select } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadCountries } from '../../store/countries/countries.action'
import classes from '../../asset/css/login/custom_select.module.css'


const SelectCountry = ({number, setNumber, code, setcode}) => {
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

import { Avatar, Box, Button, Container, FormControl, Grid, IconButton, TextField, Typography } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import React from 'react'
import { completeProfile, setUserImage, uploadUserImage } from '../../store/auth/auth.slice';
import { makeStyles } from '@mui/styles';
import { useSelector, useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    formInput: {
        marginTop: "16px !important",
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

const Profile = () => {
    const classes = useStyles()
    let {message, loading, err, image} = useSelector(state => state.auth)
    let dispatch = useDispatch()
    const handleSubmit = (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        const userData = {
          first_name: data.get('firstName'),
          last_name: data.get('lastName'),
          email: data.get('email')
        };
        dispatch(completeProfile(userData))
    };

    const updateAvatar = (input) => {
        const data = new FormData()
        if (input.target.files && input.target.files[0]) {
          var reader = new FileReader()
          reader.onload = e => {
            dispatch(setUserImage(e.target.result))
          }
          reader.readAsDataURL(input.target.files[0])
          data.append('image' , input.target.files[0])
          dispatch(uploadUserImage(data))
        }
      }

    return (
        <>
            <Container component="main" maxWidth="xs">
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
                <label htmlFor="file">
                        <Avatar
                            sx={{ m: 1, bgcolor: 'secondary.main' }}
                            src={image}
                            style={{
                            margin: "10px",
                            width: "150px",
                            height: "150px",
                            }}
                            />
                </label>
                <input
                    accept="image/*"
                    id="file"
                    type="file"
                    onChange={updateAvatar}
                    hidden
                />
            <Typography component="h1" variant="h5">
                Profile Data
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    helperText={err ? message: ""}
                    error = {err? true : false}
                    autoFocus
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    helperText={err ? message: ""}
                    error = {err? true : false}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    helperText={err ? message: ""}
                    error = {err? true : false}
                    />
                </Grid>
                </Grid>
                <FormControl className={classes.formInput} fullWidth>
                    {loading ? <LoadingButton className={classes.buttonColor} size="large" loading loadingPosition="end" color="primary" endIcon={<SendIcon />} align="center" variant="outlined">Please Waite...</LoadingButton>
                            : <Button type="submit" className={classes.buttonColor} endIcon={<SendIcon />} size="large" variant="contained" color="primary" align="center">  Next </Button>
                    }
                </FormControl>
            </Box>
            </Box>
        </Container>
        </>
    )
}

export default Profile

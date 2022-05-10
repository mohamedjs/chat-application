import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Cookie from 'js-cookie'
import axios from "../axios.js"

export const sendCodeToUser = createAsyncThunk(
    'auth/sendCodeToUser',
    async (phone, thunkApi) => {
        try {
            const response = await axios.post("/login", {"phone" : phone})
            return {...response.data, phone:phone}
        } catch (err) {
            if (!err.response) {
              throw err
            }
            return thunkApi.rejectWithValue(err.response.data)
          }

    }
)

export const verifyUserCode = createAsyncThunk(
    'auth/verifyUserCode',
    async (code, thunkApi) => {
        try {
            const response = await axios.post("/verify", {"code" : code})
            return response.data
        } catch (err) {
            if (!err.response) {
              throw err
            }
            return thunkApi.rejectWithValue(err.response.data)
        }

    }
)

export const completeProfile = createAsyncThunk(
    'auth/completeProfile',
    async (userData, thunkApi) => {
        try {
            const response = await axios.post("/complete-profile", userData)
            return response.data
        } catch (err) {
            if (!err.response) {
              throw err
            }
            return thunkApi.rejectWithValue(err.response.data)
        }

    }
)

export const uploadUserImage = createAsyncThunk(
    'auth/uploadUserImage',
    async (userImage, thunkApi) => {
        try {
            const response = await axios.post("/upload-image", userImage)
            return response.data
        } catch (err) {
            if (!err.response) {
              throw err
            }
            return thunkApi.rejectWithValue(err.response.data)
        }

    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        phone: "",
        message: "",
        image: "",
        status: false,
        next: 1,
        open: false,
        loading: false,
        err: false
    },
    reducers: {
      // standard reducer logic, with auto-generated action types per reducer
      closeMessage: (state) => {
        state.open = false
      },
      openAlert: (state, action) => {
          state.message = action.payload.message
          state.status = action.payload.status
          state.open = true
      },
      setUserImage: (state, action) => {
          state.image = action.payload
      }
    },
    extraReducers:  {
        [sendCodeToUser.pending]: (state, action) => {
            state.loading = true
            state.err  = false
        },
        [sendCodeToUser.fulfilled]: (state, action) => {
            Cookie.set('next', 2)
            state.message = action.payload.message
            state.status = action.payload.status
            state.phone = action.payload.phone
            state.next =  2
            state.open =  true
            state.loading = false
            state.err  = false
        },
        [sendCodeToUser.rejected]: (state, action) => {
            state.message = action.payload.message
            state.loading = false
            state.err  = true
        },
        [verifyUserCode.pending]: (state, action) => {
            state.loading = true
            state.err  = false
        },
        [verifyUserCode.fulfilled]: (state, action) => {
            if(action.payload.data.complete_profile) {
                Cookie.set('next', 4)
                state.next =  4
            } else {
                Cookie.set('next', 3)
                state.next =  3
            }
            state.message = action.payload.message
            state.status = action.payload.status
            state.loading = false
            state.open =  true
            state.err  = false
            Cookie.set('token', action.payload.data.token)
        },
        [verifyUserCode.rejected]: (state, action) => {
            state.message = action.payload.message
            state.loading = false
            state.err  = true
        },
        [completeProfile.pending]: (state, action) => {
            state.loading = true
            state.err  = false
        },
        [completeProfile.fulfilled]: (state, action) => {
            Cookie.set('next', 4)
            state.message = action.payload.message
            state.status = action.payload.status
            state.next =  4
            state.open =  true
            state.loading = false
            state.err  = false
        },
        [completeProfile.rejected]: (state, action) => {
            state.message = action.payload.message
            state.loading = false
            state.err  = true
        },
    }
})

export const {closeMessage, openAlert, setUserImage} = authSlice.actions

export default authSlice.reducer

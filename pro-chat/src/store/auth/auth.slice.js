import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
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

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        phone: "",
        message: "",
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
      }
    },
    extraReducers:  {
        [sendCodeToUser.pending]: (state, action) => {
            state.loading = true
            state.err  = false
        },
        [sendCodeToUser.fulfilled]: (state, action) => {
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
            state.message = action.payload.message
            state.status = action.payload.status
            state.next =  3
            state.open =  true
            state.err  = false
        },
        [verifyUserCode.rejected]: (state, action) => {
            state.message = action.payload.message
            state.loading = false
            state.err  = true
        },
    }
})

export const {closeMessage, openAlert} = authSlice.actions

export default authSlice.reducer

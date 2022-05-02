import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "../axios.js"

export const listRoom = createAsyncThunk(
    'rooms',
    async (thunkApi) => {
        try {
            const response = await axios.get("/rooms")
            return response.data
        } catch (err) {
            if (!err.response) {
              throw err
            }
            return thunkApi.rejectWithValue(err.response.data)
          }

    }
)

export const roomSlice = createSlice({
    name: 'room',
    initialState: {
        rooms: [],
        message: "",
        status: false,
        open: false,
        loading: false
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
        [listRoom.pending]: (state, action) => {
            state.loading = true
        },
        [listRoom.fulfilled]: (state, action) => {
            state.rooms = action.payload.data.data
            state.message = action.payload.message
            state.status = action.payload.status
            state.open =  true
            state.loading = false
        },
        [listRoom.rejected]: (state, action) => {
            state.message = action.payload.message
        },

    }
})

export const {closeMessage, openAlert} = roomSlice.actions

export default roomSlice.reducer

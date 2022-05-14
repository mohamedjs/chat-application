import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "../axios.js"
import { addMessageToRoom } from '../room/room.slice';

export const sendMessageToUser = createAsyncThunk(
    'chat',
    async (messageData, thunkApi) => {
        console.log(messageData);
        try {
            const response = await axios.post(`/chats`, messageData)
            thunkApi.dispatch(addMessageToRoom(response.data.data))
            return response.data
        } catch (err) {
            if (!err.response) {
              throw err
            }
            return thunkApi.rejectWithValue(err.response.data)
          }

    }
)

export const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        userMessage : {},
        message : "",
        status: false,
        open: false,
        loading: false
    },
    reducers: {
    },
    extraReducers:  {
        [sendMessageToUser.pending]: (state, action) => {
            state.loading = true
        },
        [sendMessageToUser.fulfilled]: (state, action) => {
            state.userMessage = action.payload.data
            state.message = action.payload.message
            state.status = action.payload.status
            state.open =  true
            state.loading = false
        },
        [sendMessageToUser.rejected]: (state, action) => {
            state.message = action.payload.message
        }
    }
})

export default chatSlice.reducer

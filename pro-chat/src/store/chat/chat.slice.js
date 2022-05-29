import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Cookie from 'js-cookie';
import axios from "../axios.js"
import { addMessageToRoom } from '../room/room.slice';

export const sendMessageToUser = createAsyncThunk(
    'chat',
    async (messageData, thunkApi) => {
        try {
            let today = new Date()
            let messageObj  =  {...messageData.data, user: JSON.parse(Cookie.get("user")), id: Math.floor(Math.random() * 1000) + 1, time: today.getHours() + ':' + today.getMinutes()}
            thunkApi.dispatch(addMessageToRoom({message: messageObj, scrollableNodeRef: messageData.scrollableNodeRef}))
            const response = await axios.post(`/chats`, messageData.data)
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

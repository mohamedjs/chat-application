import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Cookie from 'js-cookie';
import axios from "../axios.js"
import { addMessageToRoom } from '../room/room.slice';
import * as moment from 'moment'

export const sendMessageToUser = createAsyncThunk(
    'chat',
    async (messageData, thunkApi) => {
        try {
            let time = moment().format("hh:mm A")
            const formDataObj = {};
            const state = thunkApi.getState()
            messageData.data.forEach((value, key) => (formDataObj[key] = value));
            if(parseInt(formDataObj.type) === 2){
                formDataObj.message = state.chats.fileMessages.join("-")
                delete formDataObj['message[]'];
            }
            let messageObj  =  {...formDataObj, user: JSON.parse(Cookie.get("user")), id: Math.floor(Math.random() * 1000) + 1, time: time}
            console.log(messageObj);
            thunkApi.dispatch(addMessageToRoom({message: messageObj, scrollableNodeRef: messageData.scrollableNodeRef}))
            const response = await axios.post(`/chats`, messageData.data, {
                headers: {
                  "Content-Type": "multipart/form-data"
                }
            });
            return response.data
        } catch (err) {
            if (!err.response) {
                return thunkApi.rejectWithValue( err )
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
        fileMessages: [],
        status: false,
        open: false,
        loading: false
    },
    reducers: {
        setFileMessage: (state, action) => {
            state.fileMessages = action.payload
            console.log(state.fileMessages);
        }
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
            console.log(action.payload);
            // state.message = action.payload.message

        }
    }
})
export const {setFileMessage} = chatSlice.actions

export default chatSlice.reducer

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

export const getRoom = createAsyncThunk(
    'room',
    async (roomId, thunkApi) => {
        try {
            const response = await axios.get(`/rooms/${roomId}`)
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
        room : {},
        roomId: '',
        message: "",
        show:false ,
        status: false,
        open: false,
        loading: false,
        loadingRoom: true,
        callData: {},
        openVideoCall: false,
        callSession: null
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
      setRoomId: (state, action) => {
          state.roomId = action.payload
          if(window.innerWidth < 600) {
              state.show   = true
          }
      },
      setShow: (state) => {
          state.show   = false
      },
      addMessageToRoom: (state, action) => {
        state.room.messages.push(action.payload.message)
        state.rooms.find((room) => room.id === action.payload.message.room_id).lastMessage = action.payload.message
        var container = document.getElementById('chatBox');
        setTimeout(() => {
            container.scrollTop =  container.scrollHeight
        }, 100);
      },
      setOpenVideoCall: (state, action) => {
          state.openVideoCall   = action.payload
      },
      setCallSession: (state, action) => {
        state.callSession = action.payload
      },
      setCallData: (state, action) => {
        state.callData = action.payload
      }
    },
    extraReducers:  {
        [listRoom.pending]: (state, action) => {
            state.loading = true
        },
        [listRoom.fulfilled]: (state, action) => {
            state.rooms = action.payload.data.data
            state.roomId = action.payload.data.data[0].id
            state.message = action.payload.message
            state.status = action.payload.status
            state.open =  true
            state.loading = false
        },
        [listRoom.rejected]: (state, action) => {
            state.message = action.payload.message
        },
        [getRoom.pending]: (state, action) => {
            state.loadingRoom = true
        },
        [getRoom.fulfilled]: (state, action) => {
            state.room = action.payload.data
            state.message = action.payload.message
            state.status = action.payload.status
            state.open =  true
            state.loadingRoom = false
        },
        [getRoom.rejected]: (state, action) => {
            state.message = action.payload.message
            state.loadingRoom = false
        },

    }
})

export const {closeMessage, openAlert, setRoomId, addMessageToRoom, setShow, setOpenVideoCall, setCallSession, setCallData} = roomSlice.actions

export default roomSlice.reducer

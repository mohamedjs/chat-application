import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "../axios.js"

export const listRoom = createAsyncThunk(
    'rooms',
    async (search, thunkApi) => {
        try {
            const response = await axios.get(`/rooms/?search=${search}`)
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
            const state = thunkApi.getState()
            const response = await axios.get(`/rooms/${roomId}?page=${state.rooms.page}`)
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
        messages: [],
        roomId: '',
        message: "",
        show:false ,
        status: false,
        open: false,
        loading: false,
        loadingRoom: true,
        callData: {},
        callSession: null,
        page: 1,
        openVideoCall: false,
        showAccept: false,
        search: ''
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
          state.messages = []
          if(window.innerWidth < 600) {
              state.show   = true
          }
      },
      setShow: (state) => {
          state.show   = false
      },
      addMessageToRoom: (state, action) => {
        state.messages.push(action.payload.message)
        state.rooms.find((room) => room.id === parseInt(action.payload.message.room_id)).lastMessage = action.payload.message
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
      },
      setShowAccept: (state, action) => {
        state.showAccept = action.payload
      },
      setPage: (state, action) => {
        state.page = action.payload
      },
      setSearch: (state, action) => {
        state.search = action.payload
      },
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
            state.messages = [...action.payload.data.messages,...state.messages]
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

export const {closeMessage, openAlert, setRoomId, addMessageToRoom, setShow, setOpenVideoCall, setCallSession, setCallData, setShowAccept, setPage, setSearch} = roomSlice.actions

export default roomSlice.reducer

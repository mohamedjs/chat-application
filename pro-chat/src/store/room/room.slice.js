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
        status: false,
        open: false,
        loading: false,
        loadingRoom: true
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
      },
      addMessageToRoom: (state, action) => {
        state.room.messages.push(action.payload.message)
        if(action.payload.scrollableNodeRef){
            action.payload.scrollableNodeRef.current?.recalculate()
            const scrollEl = action.payload.scrollableNodeRef.current?.getScrollElement()
            scrollEl.scrollTo({top: scrollEl.scrollHeight, behavior: 'smooth'})
        }
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

export const {closeMessage, openAlert, setRoomId, addMessageToRoom} = roomSlice.actions

export default roomSlice.reducer

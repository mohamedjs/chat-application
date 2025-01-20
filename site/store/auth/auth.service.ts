import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "../axios"
import Cookie from 'js-cookie'
import { AuthState } from "./auth.type"

export class AuthService {
    static sendCodeToUser = createAsyncThunk<
        { message: string; status: boolean; phone: string }, // Return type
        string, // Argument type
        { rejectValue: string } // ThunkAPI type
    >(
        'auth/sendCodeToUser',
        async (phone, thunkApi) => {
            try {
                const response = await axios.post("/v1/login", { "phone": phone })
                return { ...response.data, phone: phone }
            } catch (err: any) {
                return thunkApi.rejectWithValue(err.response.data)
            }
        }
    )

    static verifyUserCode = createAsyncThunk<
        { message: string; status: boolean; data: { token: string; user: { complete_profile: boolean } } }, // Return type
        string, // Argument type
        { rejectValue: string } // ThunkAPI type
    >(
        'auth/verifyUserCode',
        async (code, thunkApi) => {
            try {
                const response = await axios.post("/verify", { "code": code })
                return response.data
            } catch (err) {
                return thunkApi.rejectWithValue(err.response.data)
            }
        }
    )

    static completeProfile = createAsyncThunk<
        { message: string; status: boolean }, // Return type
        any, // Argument type
        { rejectValue: string } // ThunkAPI type
    >(
        'auth/completeProfile',
        async (userData, thunkApi) => {
            try {
                const response = await axios.post("/complete-profile", userData)
                return response.data
            } catch (err) {
                return thunkApi.rejectWithValue(err.response.data)
            }
        }
    )

    static uploadUserImage = createAsyncThunk<
        { message: string; status: boolean }, // Return type
        FormData, // Argument type
        { rejectValue: string } // ThunkAPI type
    >(
        'auth/uploadUserImage',
        async (userImage, thunkApi) => {
            try {
                const response = await axios.post("/upload-image", userImage)
                return response.data
            } catch (err) {
                return thunkApi.rejectWithValue(err.response.data)
            }
        }
    )

    static handleSendCodeToUserPending = (state: AuthState) => {
        state.loading = true
        state.err = false
    }

    static handleSendCodeToUserFulfilled = (state: AuthState, action: PayloadAction<{ message: string; status: boolean; phone: string }>) => {
        Cookie.set('next', '2')
        state.message = action.payload.message
        state.status = action.payload.status
        state.phone = action.payload.phone
        state.next = 2
        state.open = true
        state.loading = false
        state.err = false
    }

    static handleSendCodeToUserRejected = (state: AuthState, action: PayloadAction<any>) => {
        state.message = action.payload
        state.loading = false
        state.err = true
    }

    static handleVerifyUserCodePending = (state: AuthState) => {
        state.loading = true
        state.err = false
    }

    static handleVerifyUserCodeFulfilled = (state: AuthState, action: PayloadAction<{ message: string; status: boolean; data: { token: string; user: { complete_profile: boolean } } }>) => {
        if (action.payload.data.user.complete_profile) {
            Cookie.set('next', '4')
            state.next = 4
        } else {
            Cookie.set('next', '3')
            state.next = 3
        }
        state.message = action.payload.message
        state.status = action.payload.status
        state.loading = false
        state.open = true
        state.err = false
        Cookie.set('token', action.payload.data.token)
        Cookie.set("user", JSON.stringify(action.payload.data.user))
    }

    static handleVerifyUserCodeRejected = (state: AuthState, action: PayloadAction<any>) => {
        state.message = action.payload
        state.loading = false
        state.err = true
    }

    static handleCompleteProfilePending = (state: AuthState) => {
        state.loading = true
        state.err = false
    }

    static handleCompleteProfileFulfilled = (state: AuthState, action: PayloadAction<{ message: string; status: boolean }>) => {
        Cookie.set('next', '4')
        state.message = action.payload.message
        state.status = action.payload.status
        state.next = 4
        state.open = true
        state.loading = false
        state.err = false
    }

    static handleCompleteProfileRejected = (state: AuthState, action: PayloadAction<any>) => {
        state.message = action.payload
        state.loading = false
        state.err = true
    }
}
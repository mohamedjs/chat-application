import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "../axios"
import Cookie from 'js-cookie'
import { AuthState } from "./auth.type"

export class AuthService {
    /**
     * ====================================
     * Send Code To User Functions
     * ====================================
     */

    // Async thunk to send verification code
    static sendCodeToUser = createAsyncThunk<
        { message: string; status: boolean; phone: string },
        string,
        { rejectValue: string }
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

    static handleSendCodeToUserPending = (state: AuthState) => {
        state.loading = true
        state.err = false
        state.message = ''
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
        state.message = action.payload.message
        state.loading = false
        state.err = true
    }

    /**
     * ====================================
     * Verify User Code Functions  
     * ====================================
     */

    // Async thunk to verify code
    static verifyUserCode = createAsyncThunk<
        { message: string; status: boolean; data: { token: string; user: { complete_profile: boolean } } },
        number,
        { rejectValue: string }
    >(
        'auth/verifyUserCode',
        async (code, thunkApi) => {
            try {
                const response = await axios.post("/v1/verify", { "code": code })
                return response.data
            } catch (err) {
                return thunkApi.rejectWithValue(err.response.data)
            }
        }
    )

    static handleVerifyUserCodePending = (state: AuthState) => {
        state.loading = true
        state.err = false
        state.message = ''
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
        console.log(action.payload);
        
        state.message = action.payload?.message || 'error'
        state.loading = false
        state.err = true
    }

    /**
     * ====================================
     * Complete Profile Functions
     * ====================================
     */

    // Async thunk to complete profile
    static completeProfile = createAsyncThunk<
        { message: string; status: boolean },
        any,
        { rejectValue: string }
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

    /**
     * ====================================
     * Upload User Image Functions
     * ====================================
     */

    // Async thunk to upload profile image
    static uploadUserImage = createAsyncThunk<
        { message: string; status: boolean },
        FormData,
        { rejectValue: string }
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
}
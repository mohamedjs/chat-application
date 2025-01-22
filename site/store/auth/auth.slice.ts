import { createSlice } from '@reduxjs/toolkit'
import { initAuthData } from './auth.type'
import { AuthService } from './auth.service'
import { AuthAction } from './auth.actions'

export const authSlice = createSlice({
    name: 'auth',
    initialState: initAuthData,
    reducers: {
        closeMessage: AuthAction.closeMessage,
        openAlert: AuthAction.openAlert,
        setUserImage: AuthAction.setUserImage,
    },
    extraReducers: (builder) => {
        builder.addCase(
            AuthService.sendCodeToUser.pending, 
            AuthService.handleSendCodeToUserPending
        )
        builder.addCase(
            AuthService.sendCodeToUser.fulfilled, 
            AuthService.handleSendCodeToUserFulfilled
        )
        builder.addCase(
            AuthService.sendCodeToUser.rejected, 
            AuthService.handleSendCodeToUserRejected
        )
        builder.addCase(
            AuthService.verifyUserCode.pending, 
            AuthService.handleVerifyUserCodePending
        )
        builder.addCase(
            AuthService.verifyUserCode.fulfilled, 
            AuthService.handleVerifyUserCodeFulfilled
        )
        builder.addCase(
            AuthService.verifyUserCode.rejected, 
            AuthService.handleVerifyUserCodeRejected
        )
        builder.addCase(
            AuthService.completeProfile.pending, 
            AuthService.handleCompleteProfilePending
        )
        builder.addCase(
            AuthService.completeProfile.fulfilled, 
            AuthService.handleCompleteProfileFulfilled
        )
        builder.addCase(
            AuthService.completeProfile.rejected, 
            AuthService.handleCompleteProfileRejected
        )
    }
})

export const { closeMessage, openAlert, setUserImage } = authSlice.actions

export default authSlice.reducer

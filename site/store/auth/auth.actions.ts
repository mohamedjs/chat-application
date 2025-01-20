import { AuthState } from "./auth.type"

export class AuthAction {
    static closeMessage = (state: AuthState) => {
        state.open = false
    }

    static openAlert = (state: AuthState, action: {payload: {message: string, status: boolean}}) => {
        state.message = action.payload.message
        state.status = action.payload.status
        state.open = true
    }

    static setUserImage = (state: AuthState, action: {payload: string}) => {
        state.image = action.payload
    }
}
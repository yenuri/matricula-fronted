import { createAction, Dispatch } from '@reduxjs/toolkit'
import { loginUrl } from '../../constants/serviceUrls'
import { decodeToken, setToken } from '../../utils/tokenManagment'
import httpClient from '../../services/httpClient'

export enum SessionActionType {
    ON_LOGIN_SUCCESS = 'ON_LOGIN_SUCCESS',
    ON_LOGIN_ERROR = 'ON_LOGIN_ERROR',
    TOGGLE_LOADING_STATE = 'TOGGLE_LOADING_STATE',
    RESET_SESSION_STATE = 'RESET_SESSION_STATE',
}

const onLoginSuccess = createAction<any>(SessionActionType.ON_LOGIN_SUCCESS)
const onLoginError = createAction<Error>(SessionActionType.ON_LOGIN_ERROR)
const toggleLoadingState = createAction<boolean>(
    SessionActionType.TOGGLE_LOADING_STATE
)
const resetSessionState = createAction<undefined>(
    SessionActionType.RESET_SESSION_STATE
)

export const loginUser = (userData: any) => async (dispatch: Dispatch) => {
    dispatch(resetSessionState())
    dispatch(toggleLoadingState(true))
    try {
        const { data: response } = await httpClient.post(
            loginUrl,
            userData,
            false
        )
        const expirationDate = new Date(response.expiracion)
        setToken(response.token, expirationDate)
        dispatch(onLoginSuccess(decodeToken()))
    } catch (error) {
        dispatch(onLoginError(error as Error))
    }
    dispatch(toggleLoadingState(false))
}

export const SessionActions = {
    onLoginSuccess,
    onLoginError,
    toggleLoadingState,
    resetSessionState,
}

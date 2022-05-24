import { SessionAction, SessionActionType } from '../actions/session'

export interface SessionState {
    userName: string
    password: string
    authenticated: boolean
}

const getInitialState = (): SessionState => {
    return {
        userName: '',
        password: '',
        authenticated: false,
    }
}

const UpdateUserNameExecutor = (
    state: SessionState,
    { payload }: SessionAction
) => {
    return {
        ...state,
        userName: payload.userName,
    }
}

export const userReducer = (
    state: SessionState = getInitialState(),
    action: SessionAction
) => {
    const { type, payload } = action
    switch (type) {
        case SessionActionType.UPDATE_USERNAME:
            return UpdateUserNameExecutor(state, action)
        default:
            return state
    }
}

import { createReducer } from '@reduxjs/toolkit'
import {
    clearMatriculasByUser,
    geMatriculasByUserFail,
    geMatriculasByUserSuccess,
    geMatriculasDetailFail,
    geMatriculasDetailSuccess,
    geMatriculasFail,
    geMatriculasSuccess,
    toggleGetMatriculasByUserState,
    toggleGetMatriculasDetailState,
    toggleGetMatriculasState,
} from '../actions/matriculas'

interface InnerSTate {
    loading: boolean
    data: any
    error: { message: string } | null
}

export interface MatriculaState {
    list: InnerSTate
    filterList: InnerSTate
    matriculaDetail: InnerSTate
}

const getInitialInnerState = () => {
    return {
        loading: false,
        data: null,
        error: null,
    }
}

const getInitialState = () => {
    return {
        list: getInitialInnerState(),
        filterList: getInitialInnerState(),
        matriculaDetail: getInitialInnerState(),
    }
}

export const geMatriculasByUserSuccessExecutor = (
    state: MatriculaState,
    action: any
) => {
    state.filterList.data = action.payload
}

export const geMatriculasByUserFailExecutor = (
    state: MatriculaState,
    action: any
) => {
    const { message } = action.payload
    state.filterList.error = { message }
}
export const toggleGetMatriculasByUserStateExecutor = (
    state: MatriculaState,
    action: any
) => {
    state.filterList.loading = action.payload
}

export const clearMatriculasByUserExecutor = (state: MatriculaState) => {
    return {
        ...state,
        filterList: getInitialInnerState(),
    }
}
export const geMatriculasDetailSuccessExecutor = (
    state: MatriculaState,
    action: any
) => {
    state.matriculaDetail.data = action.payload
}
export const geMatriculasDetailFailExecutor = (
    state: MatriculaState,
    action: any
) => {
    const { message } = action.payload
    state.matriculaDetail.error = { message }
}
export const toggleGetMatriculasDetailStateExecutor = (
    state: MatriculaState,
    action: any
) => {
    state.matriculaDetail.loading = action.payload
}
export const geMatriculasSuccessExecutor = (state: MatriculaState, action: any) => {
    state.list.data = action.payload
}
export const geMatriculasFailExecutor = (state: MatriculaState, action: any) => {
    const { message } = action.payload
    state.list.error = { message }
}

export const toggleGetMatriculasStateExecutor = (
    state: MatriculaState,
    action: any
) => {
    state.list.loading = action.payload
}

const matriculaReducerBuilder = (builder: any) => {
    return builder
        .addCase(geMatriculasByUserSuccess, geMatriculasByUserSuccessExecutor)
        .addCase(geMatriculasByUserFail, geMatriculasByUserFailExecutor)
        .addCase(
            toggleGetMatriculasByUserState,
            toggleGetMatriculasByUserStateExecutor
        )
        .addCase(geMatriculasDetailSuccess, geMatriculasDetailSuccessExecutor)
        .addCase(geMatriculasDetailFail, geMatriculasDetailFailExecutor)
        .addCase(
            toggleGetMatriculasDetailState,
            toggleGetMatriculasDetailStateExecutor
        )
        .addCase(geMatriculasSuccess, geMatriculasSuccessExecutor)
        .addCase(geMatriculasFail, geMatriculasFailExecutor)
        .addCase(toggleGetMatriculasState, toggleGetMatriculasStateExecutor)
        .addCase(clearMatriculasByUser, clearMatriculasByUserExecutor)
}

export const matriculasReducer = createReducer(
    getInitialState(),
    matriculaReducerBuilder
)

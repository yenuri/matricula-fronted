import { createAction, Dispatch } from '@reduxjs/toolkit'
import { Student } from '../../types/Student'
import httpClient from '../../services/httpClient'
import { studentsUrl } from '../../constants/serviceUrls'

export enum StudentActionType {
    GET_STUDENT_LIST_ON_SUCCESS = 'GET_STUDENT_LIST_ON_SUCCESS',
    GET_STUDENT_LIST_ON_ERROR = 'GET_STUDENT_LIST_ON_ERROR',
    TOGGLE_GET_STUDENT_LIST_LOADING_STATE = 'TOGGLE_GET_STUDENT_LIST_LOADING_STATE',

    UPDATE_STUDENT_ON_SUCCESS = 'UPDATE_STUDENT_ON_SUCCESS',
    UPDATE_STUDENT_ON_ERROR = 'UPDATE_STUDENT_ON_ERROR',
    TOGGLE_UPDATE_STUDENT_LOADING_STATE = 'TOGGLE_UPDATE_STUDENT_LOADING_STATE',

    CREATE_STUDENT_ON_SUCCESS = 'CREATE_STUDENT_ON_SUCCESS',
    CREATE_STUDENT_ON_ERROR = 'CREATE_STUDENT_ON_ERROR',
    TOGGLE_CREATE_STUDENT_LOADING_STATE = 'TOGGLE_CREATE_STUDENT_LOADING_STATE',

    DELETE_STUDENT_ON_SUCCESS = 'DELETE_STUDENT_ON_SUCCESS',
    DELETE_STUDENT_ON_ERROR = 'DELETE_STUDENT_ON_ERROR',
    TOGGLE_DELETE_STUDENT_LOADING_STATE = 'TOGGLE_DELETE_STUDENT_LOADING_STATE',

    RESET_STUDENT_STATE = 'RESET_STUDENT_STATE',
}

const onUpdateStudentSuccess = createAction<Student>(
    StudentActionType.UPDATE_STUDENT_ON_SUCCESS
)

const onUpdateStudentError = createAction<Error>(
    StudentActionType.UPDATE_STUDENT_ON_ERROR
)

const toggleUpdateStudentLoadingState = createAction<boolean>(
    StudentActionType.TOGGLE_UPDATE_STUDENT_LOADING_STATE
)

const onCreateStudentSuccess = createAction<Student>(
    StudentActionType.CREATE_STUDENT_ON_SUCCESS
)

const onCreateStudentError = createAction<Error>(
    StudentActionType.CREATE_STUDENT_ON_ERROR
)

const toggleCreateStudentLoadingState = createAction<boolean>(
    StudentActionType.TOGGLE_CREATE_STUDENT_LOADING_STATE
)

const onDeleteStudentSuccess = createAction<number | string>(
    StudentActionType.DELETE_STUDENT_ON_SUCCESS
)

const onDeleteStudentError = createAction<Error>(
    StudentActionType.DELETE_STUDENT_ON_ERROR
)

const toggleDeleteStudentLoadingState = createAction<boolean>(
    StudentActionType.TOGGLE_DELETE_STUDENT_LOADING_STATE
)

const onGetStudentListSuccess = createAction<Student[]>(
    StudentActionType.GET_STUDENT_LIST_ON_SUCCESS
)

const onGetStudentListError = createAction<Error>(
    StudentActionType.GET_STUDENT_LIST_ON_ERROR
)

const toggleGetStudentListLoadingState = createAction<boolean>(
    StudentActionType.TOGGLE_GET_STUDENT_LIST_LOADING_STATE
)

const resetStudentState = createAction<undefined>(
    StudentActionType.RESET_STUDENT_STATE
)

const getStudents = () => async (dispatch: Dispatch) => {
    dispatch(toggleGetStudentListLoadingState(true))
    try {
        const { data: studentList } = await httpClient.get(studentsUrl)
        dispatch(onGetStudentListSuccess(studentList))
    } catch (error) {
        dispatch(onGetStudentListError(error as Error))
    }
    dispatch(toggleGetStudentListLoadingState(false))
}

const createStudent =
    (student: Partial<Student>) => async (dispatch: Dispatch) => {
        dispatch(toggleCreateStudentLoadingState(true))
        try {
            const { data: response } = await httpClient.post(
                studentsUrl,
                student
            )
            dispatch(onCreateStudentSuccess(response))
        } catch (error) {
            dispatch(onCreateStudentError(error as Error))
        }
        dispatch(toggleCreateStudentLoadingState(false))
    }

const updateStudent = (student: Student) => async (dispatch: Dispatch) => {
    dispatch(toggleUpdateStudentLoadingState(true))
    try {
        const { data: response } = await httpClient.put(
            `${studentsUrl}/${student.id}`,
            student
        )
        dispatch(onUpdateStudentSuccess(response))
    } catch (error) {
        dispatch(onUpdateStudentError(error as Error))
    }
    dispatch(toggleUpdateStudentLoadingState(false))
}

const deleteStudent = (id: string | number) => async (dispatch: Dispatch) => {
    dispatch(toggleDeleteStudentLoadingState(true))
    try {
        await httpClient.delete(`${studentsUrl}/${id}`)
        dispatch(onDeleteStudentSuccess(id))
    } catch (error) {
        dispatch(onDeleteStudentError(error as Error))
    }
    dispatch(toggleDeleteStudentLoadingState(false))
}

export const StudentsActions = {
    onGetStudentListSuccess,
    onGetStudentListError,
    toggleGetStudentListLoadingState,

    onCreateStudentSuccess,
    onCreateStudentError,
    toggleCreateStudentLoadingState,
    createStudent,

    onUpdateStudentSuccess,
    onUpdateStudentError,
    toggleUpdateStudentLoadingState,
    updateStudent,

    onDeleteStudentSuccess,
    onDeleteStudentError,
    toggleDeleteStudentLoadingState,
    deleteStudent,

    resetStudentState,
    getStudents,
}

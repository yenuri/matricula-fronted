import { createAction, Dispatch } from '@reduxjs/toolkit'
import { Course } from '../../types/Course'
import { coursesUrl } from '../../constants/serviceUrls'
import httpClient from '../../services/httpClient'

export enum CourseActionType {
    GET_COURSE_LIST_ON_SUCCESS = 'GET_COURSE_LIST_ON_SUCCESS',
    GET_COURSE_LIST_ON_ERROR = 'GET_COURSE_LIST_ON_ERROR',
    TOGGLE_GET_COURSE_LIST_LOADING_STATE = 'TOGGLE_GET_COURSE_LIST_LOADING_STATE',

    UPDATE_COURSE_ON_SUCCESS = 'UPDATE_COURSE_ON_SUCCESS',
    UPDATE_COURSE_ON_ERROR = 'UPDATE_COURSE_ON_ERROR',
    TOGGLE_UPDATE_COURSE_LOADING_STATE = 'TOGGLE_UPDATE_COURSE_LOADING_STATE',

    CREATE_COURSE_ON_SUCCESS = 'CREATE_COURSE_ON_SUCCESS',
    CREATE_COURSE_ON_ERROR = 'CREATE_COURSE_ON_ERROR',
    TOGGLE_CREATE_COURSE_LOADING_STATE = 'TOGGLE_CREATE_COURSE_LOADING_STATE',

    DELETE_COURSE_ON_SUCCESS = 'DELETE_COURSE_ON_SUCCESS',
    DELETE_COURSE_ON_ERROR = 'DELETE_COURSE_ON_ERROR',
    TOGGLE_DELETE_COURSE_LOADING_STATE = 'TOGGLE_DELETE_COURSE_LOADING_STATE',

    RESET_COURSE_STATE = 'RESET_COURSE_STATE',
}

const onUpdateCourseSuccess = createAction<Course>(
    CourseActionType.UPDATE_COURSE_ON_SUCCESS
)

const onUpdateCourseError = createAction<Error>(
    CourseActionType.UPDATE_COURSE_ON_ERROR
)

const toggleUpdateCourseLoadingState = createAction<boolean>(
    CourseActionType.TOGGLE_UPDATE_COURSE_LOADING_STATE
)

const onCreateCourseSuccess = createAction<Course>(
    CourseActionType.CREATE_COURSE_ON_SUCCESS
)

const onCreateCourseError = createAction<Error>(
    CourseActionType.CREATE_COURSE_ON_ERROR
)

const toggleCreateCourseLoadingState = createAction<boolean>(
    CourseActionType.TOGGLE_CREATE_COURSE_LOADING_STATE
)

const onDeleteCourseSuccess = createAction<number | string>(
    CourseActionType.DELETE_COURSE_ON_SUCCESS
)

const onDeleteCourseError = createAction<Error>(
    CourseActionType.DELETE_COURSE_ON_ERROR
)

const toggleDeleteCourseLoadingState = createAction<boolean>(
    CourseActionType.TOGGLE_DELETE_COURSE_LOADING_STATE
)

const onGetCourseListSuccess = createAction<Course[]>(
    CourseActionType.GET_COURSE_LIST_ON_SUCCESS
)

const onGetCourseListError = createAction<Error>(
    CourseActionType.GET_COURSE_LIST_ON_ERROR
)

const toggleGetCourseListLoadingState = createAction<boolean>(
    CourseActionType.TOGGLE_GET_COURSE_LIST_LOADING_STATE
)

const resetCourseState = createAction<undefined>(
    CourseActionType.RESET_COURSE_STATE
)

const getCourses = () => async (dispatch: Dispatch) => {
    dispatch(toggleGetCourseListLoadingState(true))
    try {
        const { data: CourseList } = await httpClient.get(coursesUrl)
        dispatch(onGetCourseListSuccess(CourseList))
    } catch (error) {
        dispatch(onGetCourseListError(error as Error))
    }
    dispatch(toggleGetCourseListLoadingState(false))
}

const createCourse =
    (course: Partial<Course>) => async (dispatch: Dispatch) => {
        dispatch(toggleCreateCourseLoadingState(true))
        try {
            const { data: response } = await httpClient.post(coursesUrl, course)
            dispatch(onCreateCourseSuccess(response))
        } catch (error) {
            dispatch(onCreateCourseError(error as Error))
        }
        dispatch(toggleCreateCourseLoadingState(false))
    }

const updateCourse = (course: Course) => async (dispatch: Dispatch) => {
    dispatch(toggleUpdateCourseLoadingState(true))
    try {
        const { data: response } = await httpClient.put(
            `${coursesUrl}/${course.id}`,
            course
        )
        dispatch(onUpdateCourseSuccess(response))
    } catch (error) {
        dispatch(onUpdateCourseError(error as Error))
    }
    dispatch(toggleUpdateCourseLoadingState(false))
}

const deleteCourse = (id: string | number) => async (dispatch: Dispatch) => {
    dispatch(toggleDeleteCourseLoadingState(true))
    try {
        await httpClient.delete(`${coursesUrl}/${id}`)
        dispatch(onDeleteCourseSuccess(id))
    } catch (error) {
        dispatch(onDeleteCourseError(error as Error))
    }
    dispatch(toggleDeleteCourseLoadingState(false))
}

export const CoursesActions = {
    onGetCourseListSuccess,
    onGetCourseListError,
    toggleGetCourseListLoadingState,

    onCreateCourseSuccess,
    onCreateCourseError,
    toggleCreateCourseLoadingState,
    createCourse,

    onUpdateCourseSuccess,
    onUpdateCourseError,
    toggleUpdateCourseLoadingState,
    updateCourse,

    onDeleteCourseSuccess,
    onDeleteCourseError,
    toggleDeleteCourseLoadingState,
    deleteCourse,

    resetCourseState,
    getCourses,
}

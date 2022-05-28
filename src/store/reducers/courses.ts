import {Course} from "../../types/Course";
import {CoursesActions} from "../actions/courses";
import {createReducer} from "@reduxjs/toolkit";

export interface CoursesState {
    getCoursesListInProgress: boolean;
    coursesList: Course[] | null;
    getCoursesListError: { message: string } | null;

    createCourseInProgress: boolean;
    createCourseError: { message: string } | null;

    updateCourseInProgress: boolean;
    updateCourseError: { message: string } | null;

    deleteCourseInProgress: boolean;
    deleteCourseError: { message: string } | null;
}

const getInitialState = ():CoursesState => {
    return {
        getCoursesListError: null,
        getCoursesListInProgress: false,
        coursesList: null,
        createCourseInProgress:false,
        createCourseError:null,
        updateCourseInProgress:false,
        updateCourseError:null,
        deleteCourseInProgress:false,
        deleteCourseError:null,
    };
};

const onGetCourseListSuccess = (
    state: CoursesState,
    { payload }: ReturnType<typeof CoursesActions.onGetCourseListSuccess>
) => {
    return {
        ...state,
        coursesList: payload,
    };
};

const onGetCourseListError = (
    state: CoursesState,
    { payload }: ReturnType<typeof CoursesActions.onGetCourseListError>
) => {
    return {
        ...state,
        getCoursesListError: { message: payload.message },
    };
};

const toggleGetCourseListLoadingState = (
    state: CoursesState,
    { payload }: ReturnType<typeof CoursesActions.toggleGetCourseListLoadingState>
) => {
    return {
        ...state,
        getCoursesListInProgress: payload,
    };
};

const onCreateCourseSuccess = (
    state: CoursesState,
    { payload }: ReturnType<typeof CoursesActions.onCreateCourseSuccess>
) => {
    return {
        ...state,
        coursesList: state.coursesList?.concat(payload),
    };
};

const onCreateCourseError = (
    state: CoursesState,
    { payload }: ReturnType<typeof CoursesActions.onCreateCourseError>
) => {
    return {
        ...state,
        createCourseError: { message: payload.message },
    };
};

const toggleCreateCourseLoadingState = (
    state: CoursesState,
    { payload }: ReturnType<typeof CoursesActions.toggleCreateCourseLoadingState>
) => {
    return {
        ...state,
        createCourseInProgress: payload,
    };
};

const onUpdateCourseSuccess = (
    state: CoursesState,
    { payload }: ReturnType<typeof CoursesActions.onUpdateCourseSuccess>
) => {
    return {
        ...state,
        coursesList: state.coursesList?.map(function replaceCourse(courseItem) {
            return courseItem.id !== payload.id ? courseItem : payload;
        }),
    };
};

const onUpdateCourseError = (
    state: CoursesState,
    { payload }: ReturnType<typeof CoursesActions.onUpdateCourseError>
) => {
    return {
        ...state,
        updateCourseError: { message: payload.message },
    };
};

const toggleUpdateCourseLoadingState = (
    state: CoursesState,
    { payload }: ReturnType<typeof CoursesActions.toggleUpdateCourseLoadingState>
) => {
    return {
        ...state,
        updateCourseInProgress: payload,
    };
};

const onDeleteCourseSuccess = (
    state: CoursesState,
    { payload }: ReturnType<typeof CoursesActions.onDeleteCourseSuccess>
) => {
    return {
        ...state,
        coursesList: state.coursesList?.filter(function removeCourse(courseItem) {
            return courseItem.id !== payload;
        }),
    };
};

const onDeleteCourseError = (
    state: CoursesState,
    { payload }: ReturnType<typeof CoursesActions.onDeleteCourseError>
) => {
    return {
        ...state,
        deleteCourseError: { message: payload.message },
    };
};

const toggleDeleteCourseLoadingState = (
    state: CoursesState,
    { payload }: ReturnType<typeof CoursesActions.toggleDeleteCourseLoadingState>
) => {
    return {
        ...state,
        deleteCourseInProgress: payload,
    };
};

const resetCourseState = () => getInitialState();

const coursesReducerBuilder = (builder: any) => {
    builder.addCase(CoursesActions.onCreateCourseSuccess, onCreateCourseSuccess);
    builder.addCase(CoursesActions.onCreateCourseError, onCreateCourseError);
    builder.addCase(
        CoursesActions.toggleCreateCourseLoadingState,
        toggleCreateCourseLoadingState
    );


    builder.addCase(CoursesActions.onUpdateCourseSuccess, onUpdateCourseSuccess);
    builder.addCase(
        CoursesActions.onUpdateCourseError,
        onUpdateCourseError
    );
    builder.addCase(CoursesActions.toggleUpdateCourseLoadingState, toggleUpdateCourseLoadingState);


    builder.addCase(CoursesActions.onDeleteCourseSuccess, onDeleteCourseSuccess);
    builder.addCase(CoursesActions.onDeleteCourseError, onDeleteCourseError);
    builder.addCase(
        CoursesActions.toggleDeleteCourseLoadingState,
        toggleDeleteCourseLoadingState
    );

    builder.addCase(CoursesActions.onGetCourseListSuccess, onGetCourseListSuccess);
    builder.addCase(CoursesActions.onGetCourseListError, onGetCourseListError);
    builder.addCase(
        CoursesActions.toggleGetCourseListLoadingState,
        toggleGetCourseListLoadingState
    );

    builder.addCase(CoursesActions.resetCourseState, resetCourseState);
};

export const coursesReducer = createReducer(
    getInitialState(),
    coursesReducerBuilder
);
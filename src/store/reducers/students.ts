import {Student} from "../../types/Student";
import { StudentsActions } from '../actions/students'
import {createReducer} from "@reduxjs/toolkit";

export interface StudentsState {
    getStudentsListInProgress: boolean;
    studentsList: Student[] | null;
    getStudentsListError: { message: string } | null;

    createStudentInProgress: boolean;
    createStudentError: { message: string } | null;

    updateStudentInProgress: boolean;
    updateStudentError: { message: string } | null;

    deleteStudentInProgress: boolean;
    deleteStudentError: { message: string } | null;
}

const getInitialState = ():StudentsState => {
    return {
        getStudentsListError: null,
        getStudentsListInProgress: false,
        studentsList: null,
        createStudentInProgress:false,
        createStudentError:null,
        updateStudentInProgress:false,
        updateStudentError:null,
        deleteStudentInProgress:false,
        deleteStudentError:null,
    };
};

const onGetStudentListSuccess = (
    state: StudentsState,
    { payload }: ReturnType<typeof StudentsActions.onGetStudentListSuccess>
) => {
    return {
        ...state,
        studentsList: payload,
    };
};

const onGetStudentListError = (
    state: StudentsState,
    { payload }: ReturnType<typeof StudentsActions.onGetStudentListError>
) => {
    return {
        ...state,
        getStudentsListError: { message: payload.message },
    };
};

const toggleGetStudentListLoadingState = (
    state: StudentsState,
    { payload }: ReturnType<typeof StudentsActions.toggleGetStudentListLoadingState>
) => {
    return {
        ...state,
        getStudentsListInProgress: payload,
    };
};

const onCreateStudentSuccess = (
    state: StudentsState,
    { payload }: ReturnType<typeof StudentsActions.onCreateStudentSuccess>
) => {
    return {
        ...state,
        studentsList: state.studentsList?.concat(payload),
    };
};

const onCreateStudentError = (
    state: StudentsState,
    { payload }: ReturnType<typeof StudentsActions.onCreateStudentError>
) => {
    return {
        ...state,
        createStudentError: { message: payload.message },
    };
};

const toggleCreateStudentLoadingState = (
    state: StudentsState,
    { payload }: ReturnType<typeof StudentsActions.toggleCreateStudentLoadingState>
) => {
    return {
        ...state,
        createStudentInProgress: payload,
    };
};

const onUpdateStudentSuccess = (
    state: StudentsState,
    { payload }: ReturnType<typeof StudentsActions.onUpdateStudentSuccess>
) => {
    return {
        ...state,
        studentsList: state.studentsList?.map(function replaceStudent(studentItem) {
            return studentItem.id !== payload.id ? studentItem : payload;
        }),
    };
};

const onUpdateStudentError = (
    state: StudentsState,
    { payload }: ReturnType<typeof StudentsActions.onUpdateStudentError>
) => {
    return {
        ...state,
        updateStudentError: { message: payload.message },
    };
};

const toggleUpdateStudentLoadingState = (
    state: StudentsState,
    { payload }: ReturnType<typeof StudentsActions.toggleUpdateStudentLoadingState>
) => {
    return {
        ...state,
        updateStudentInProgress: payload,
    };
};

const onDeleteStudentSuccess = (
    state: StudentsState,
    { payload }: ReturnType<typeof StudentsActions.onDeleteStudentSuccess>
) => {
    return {
        ...state,
        studentsList: state.studentsList?.filter(function removeStudent(studentItem) {
            return studentItem.id !== payload;
        }),
    };
};

const onDeleteStudentError = (
    state: StudentsState,
    { payload }: ReturnType<typeof StudentsActions.onDeleteStudentError>
) => {
    return {
        ...state,
        deleteStudentError: { message: payload.message },
    };
};

const toggleDeleteStudentLoadingState = (
    state: StudentsState,
    { payload }: ReturnType<typeof StudentsActions.toggleDeleteStudentLoadingState>
) => {
    return {
        ...state,
        deleteStudentInProgress: payload,
    };
};

const resetStudentState = () => getInitialState();

const studentsReducerBuilder = (builder: any) => {
    builder.addCase(StudentsActions.onCreateStudentSuccess, onCreateStudentSuccess);
    builder.addCase(StudentsActions.onCreateStudentError, onCreateStudentError);
    builder.addCase(
        StudentsActions.toggleCreateStudentLoadingState,
        toggleCreateStudentLoadingState
    );


    builder.addCase(StudentsActions.onUpdateStudentSuccess, onUpdateStudentSuccess);
    builder.addCase(
        StudentsActions.onUpdateStudentError,
        onUpdateStudentError
    );
    builder.addCase(StudentsActions.toggleUpdateStudentLoadingState, toggleUpdateStudentLoadingState);


    builder.addCase(StudentsActions.onDeleteStudentSuccess, onDeleteStudentSuccess);
    builder.addCase(StudentsActions.onDeleteStudentError, onDeleteStudentError);
    builder.addCase(
        StudentsActions.toggleDeleteStudentLoadingState,
        toggleDeleteStudentLoadingState
    );

    builder.addCase(StudentsActions.onGetStudentListSuccess, onGetStudentListSuccess);
    builder.addCase(StudentsActions.onGetStudentListError, onGetStudentListError);
    builder.addCase(
        StudentsActions.toggleGetStudentListLoadingState,
        toggleGetStudentListLoadingState
    );

    builder.addCase(StudentsActions.resetStudentState, resetStudentState);
};

export const studentsReducer = createReducer(
    getInitialState(),
    studentsReducerBuilder
);

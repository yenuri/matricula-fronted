import {StudentsState} from "../reducers/students";
import {createSelector} from "@reduxjs/toolkit";
import {MapToList} from "../../utils/transformation";

export const studentsStateSelector = (state: any): StudentsState => state.students;

export const studentListSelector = createSelector(
    studentsStateSelector,
    (studentState) => {
        return studentState.studentsList;
    }
);

export const getStudentsListInProgressSelector = createSelector(
    studentsStateSelector,
    (studentState) => {
        return studentState.getStudentsListInProgress;
    }
);

export const getStudentsListErrorSelector = createSelector(
    studentsStateSelector,
    (studentState) => {
        return studentState.getStudentsListError;
    }
);

export const updateStudentInProgressSelector = createSelector(
    studentsStateSelector,
    (studentState) => {
        return studentState.updateStudentInProgress;
    }
);

export const updateStudentErrorSelector = createSelector(
    studentsStateSelector,
    (studentState) => {
        return studentState.updateStudentError;
    }
);

export const deleteStudentInProgress = createSelector(
    studentsStateSelector,
    (studentState) => {
        return studentState.deleteStudentInProgress;
    }
);

export const createStudentInProgressSelector = createSelector(
    studentsStateSelector,
    (studentState) => {
        return studentState.createStudentInProgress;
    }
);

export const createStudentErrorSelector = createSelector(
    studentsStateSelector,
    (studentState) => {
        return studentState.createStudentError;
    }
);

export const deleteStudentError = createSelector(
    studentsStateSelector,
    (studentState) => {
        return studentState.deleteStudentError;
    }
);

export const studentsMapSelector = createSelector(
    studentListSelector,
    (customerList) => MapToList(customerList)
)

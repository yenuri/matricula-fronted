import { CoursesState } from '../reducers/courses'
import { createSelector } from '@reduxjs/toolkit'
import {MapToList} from "../../utils/transformation";

export const coursesStateSelector = (state: any): CoursesState => state.courses

export const courseListSelector = createSelector(
    coursesStateSelector,
    (courseState) => {
        return courseState.coursesList
    }
)

export const getCoursesListInProgressSelector = createSelector(
    coursesStateSelector,
    (courseState) => {
        return courseState.getCoursesListInProgress
    }
)

export const getCoursesListErrorSelector = createSelector(
    coursesStateSelector,
    (courseState) => {
        return courseState.getCoursesListError
    }
)

export const updateCourseInProgressSelector = createSelector(
    coursesStateSelector,
    (courseState) => {
        return courseState.updateCourseInProgress
    }
)

export const updateCourseErrorSelector = createSelector(
    coursesStateSelector,
    (courseState) => {
        return courseState.updateCourseError
    }
)

export const deleteCourseInProgress = createSelector(
    coursesStateSelector,
    (courseState) => {
        return courseState.deleteCourseInProgress
    }
)

export const createCourseInProgressSelector = createSelector(
    coursesStateSelector,
    (courseState) => {
        return courseState.createCourseInProgress
    }
)

export const createCourseErrorSelector = createSelector(
    coursesStateSelector,
    (courseState) => {
        return courseState.createCourseError
    }
)

export const deleteCourseError = createSelector(
    coursesStateSelector,
    (courseState) => {
        return courseState.deleteCourseError
    }
)

export const coursesMapSelector = createSelector(
    courseListSelector,
    (courseList) => MapToList(courseList)
)


import { configureStore } from '@reduxjs/toolkit'
import { sessionReducer as session } from './reducers/session'
import { studentsReducer as students } from './reducers/students'
import { coursesReducer as courses } from './reducers/courses'
import { matriculasReducer as matriculas } from './reducers/matriculas'

export const store = configureStore({
    reducer: { session, students, courses, matriculas },
})

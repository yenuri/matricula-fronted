import { createAction } from '@reduxjs/toolkit';
import httpClient from '../../services/httpClient';
import {
    studentsUrl,
    matriculasByUserUrl,
    matriculasUrl,
    coursesUrl,
} from '../../constants/serviceUrls';

export enum MatriculasActionTypes {
    GET_MATRICULAS_BY_USER_SUCCESS = 'GET_MATRICULAS_BY_USER_SUCCESS',
    GET_MATRICULAS_BY_USER_FAIL = 'GET_MATRICULAS_BY_USER_FAIL',
    TOGGLE_GET_MATRICULAS_BY_USER_STATE = 'TOGGLE_GET_MATRICULAS_BY_USER_STATE',
    GET_MATRICULAS_DETAIL_SUCCESS = 'GET_MATRICULAS_DETAIL_SUCCESS',
    GET_MATRICULAS_DETAIL_FAIL = 'GET_MATRICULAS_DETAIL_FAIL',
    TOGGLE_GET_MATRICULAS_DETAIL = 'TOGGLE_GET_MATRICULAS_DETAIL',
    GET_MATRICULAS_SUCCESS = 'GET_MATRICULAS_SUCCESS',
    GET_MATRICULAS_FAIL = 'GET_MATRICULAS_FAIL',
    TOGGLE_GET_MATRICULAS_STATE = 'TOGGLE_GET_MATRICULAS_STATE',
    CLEAR_MATRICULAS_BY_USER = 'CLEAR_MATRICULAS_BY_USER',
}

export const geMatriculasByUserSuccess = createAction<any>(
    MatriculasActionTypes.GET_MATRICULAS_BY_USER_SUCCESS
);
export const geMatriculasByUserFail = createAction<any>(
    MatriculasActionTypes.GET_MATRICULAS_BY_USER_FAIL
);
export const toggleGetMatriculasByUserState = createAction<boolean>(
    MatriculasActionTypes.TOGGLE_GET_MATRICULAS_BY_USER_STATE
);

export const geMatriculasDetailSuccess = createAction<any>(
    MatriculasActionTypes.GET_MATRICULAS_DETAIL_SUCCESS
);
export const geMatriculasDetailFail = createAction<any>(
    MatriculasActionTypes.GET_MATRICULAS_DETAIL_FAIL
);
export const toggleGetMatriculasDetailState = createAction<boolean>(
    MatriculasActionTypes.TOGGLE_GET_MATRICULAS_DETAIL
);

export const geMatriculasSuccess = createAction<any>(
    MatriculasActionTypes.GET_MATRICULAS_SUCCESS
);
export const geMatriculasFail = createAction<any>(
    MatriculasActionTypes.GET_MATRICULAS_FAIL
);
export const toggleGetMatriculasState = createAction<boolean>(
    MatriculasActionTypes.TOGGLE_GET_MATRICULAS_STATE
);

export const clearMatriculasByUser = createAction<undefined>(
    MatriculasActionTypes.CLEAR_MATRICULAS_BY_USER
);

export const getMatriculasByUser = (userId: any) => async (dispatch: any) => {
    dispatch(toggleGetMatriculasByUserState(true));
    try {
        const payload = {
            idStudent: userId,
        };
        const response = await httpClient.post(matriculasByUserUrl, payload);

        dispatch(geMatriculasByUserSuccess(response.data));
    } catch (e) {
        dispatch(geMatriculasByUserFail(e));
    }

    dispatch(toggleGetMatriculasByUserState(false));
};

export const getMatriculaDetail =
    (matriculaId: any, callback: any) => async (dispatch: any) => {
        dispatch(toggleGetMatriculasDetailState(true));
        try {
            const matriculaResponse = await httpClient.get(
                `${matriculasUrl}/${matriculaId}`
            );

            const studentId = matriculaResponse.data.student.id;
            const responseStudent = await httpClient.get(
                `${studentsUrl}/${studentId}`
            );

            const coursesRequest = matriculaResponse.data.items.map((p: any) => {
                return httpClient
                    .get(`${coursesUrl}/${p.course.id}`)
                    .then(({ data }: any) => data);
            });

            const coursesResponse = await Promise.all(coursesRequest);

            const jsonResponse = {
                matricula: matriculaResponse.data,
                student: responseStudent.data,
                courses: coursesResponse,
            };

            dispatch(geMatriculasDetailSuccess(jsonResponse));
            callback();
        } catch (error) {
            dispatch(geMatriculasDetailFail(error));
        }

        dispatch(toggleGetMatriculasDetailState(false));
    };

export const getMatriculaList = () => async (dispatch: any) => {
    dispatch(toggleGetMatriculasState(true));
    try {
        const response = await httpClient.get(matriculasUrl);

        dispatch(geMatriculasSuccess(response.data));
    } catch (error) {
        dispatch(geMatriculasFail(error));
    }

    dispatch(dispatch(toggleGetMatriculasState(false)));
};

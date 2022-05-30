import { MatriculaState } from "../reducers/matriculas";
import { createSelector } from "@reduxjs/toolkit";

export const matriculaStateSelector = (store:any): MatriculaState => store.matriculas;
export const matriculaDetailSelector = createSelector(
    matriculaStateSelector,
    (matriculaState) => {
        return matriculaState.matriculaDetail.data;
    }
);

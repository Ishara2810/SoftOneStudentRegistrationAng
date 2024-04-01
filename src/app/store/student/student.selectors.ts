import { createFeatureSelector, createSelector } from "@ngrx/store";
import { StudentModel } from "../models/student.model";

const getStudentState = createFeatureSelector<StudentModel>('student');

export const getStudentList = createSelector(getStudentState, (state) => {
    return state.list;
})

export const getStudent = createSelector(getStudentState, (state) => {
    return state.studentObj;
})

export const getLastInsertedRecordId = createSelector(getStudentState, (state) => {
    return state.lastUpdatedObj;
})
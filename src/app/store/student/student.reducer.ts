import { createReducer, on } from "@ngrx/store";
import { StudentState } from "./student.state";
import { addaStudentSuccess, deleteStudentSuccess, getStudentSuccess, loadStudentFail, loadStudentSuccess, updateStudentSuccess } from "./student.action";
import { Student } from "../models/student.model";

const _StudentReducer = createReducer(StudentState,
    on(loadStudentSuccess, (state, action) => {
        return {
            ...state,
            list: [...action.list],
            errormessage: ''
        }
    }),
    on(loadStudentFail, (state, action) => {
        return {
            ...state,
            list: [],
            errormessage: action.errormessage
        }
    }),
    on(getStudentSuccess, (state, action) => {
        return {
            ...state,
            studentObj: action.obj,
            errormessage: ''
        }
    }),
    on(addaStudentSuccess, (state, action) => {
        const _newdata = { ...action.inputdata };
        return {
            ...state,
            list: [...state.list, _newdata as Student],
            lastUpdatedObj: _newdata,
            errormessage: ''
        }
    }),
    on(updateStudentSuccess, (state, action) => {
        const _newdata = state.list.map(o => {
            return o.id === action.inputdata.id ? action.inputdata : o
        })
        return {
            ...state,
            list: _newdata,
            errormessage: ''
        }
    }),
    on(deleteStudentSuccess, (state, action) => {
        const _newdata = state.list.filter(o => o.id !== action.id);
        return {
            ...state,
            list: _newdata,
            errormessage: ''
        }
    }),
)

export function StudentReducer(state: any, action: any) {
    return _StudentReducer(state, action);
}
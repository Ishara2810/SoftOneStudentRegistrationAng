import { createAction, props } from "@ngrx/store";
import { Student } from "../models/student.model";

export const LOAD_STUDENT = '[student page]load student'
export const LOAD_STUDENT_SUCCESS = '[student page]load student success'
export const LOAD_STUDENT_FAIL = '[student page]load student fail'
export const ADD_STUDENT = '[student page]add student'
export const ADD_STUDENT_SUCCESS = '[student page]add student success'
export const GET_STUDENT = '[student page]get student'
export const GET_STUDENT_SUCCESS = '[student page]get student success'
export const UPDATE_STUDENT = '[student page]update student'
export const UPDATE_STUDENT_SUCCESS = '[student page]update student success'
export const DELETE_STUDENT = '[student page]delete student'
export const DELETE_STUDENT_SUCCESS = '[student page]delete associate student'

export const loadStudent = createAction(LOAD_STUDENT)
export const loadStudentSuccess = createAction(LOAD_STUDENT_SUCCESS, props<{ list: Student[] }>())
export const loadStudentFail = createAction(LOAD_STUDENT_FAIL, props<{ errormessage: string }>())

export const addStudent = createAction(ADD_STUDENT, props<{ inputdata: Student, file: File }>())
export const addaStudentSuccess = createAction(ADD_STUDENT_SUCCESS, props<{ inputdata: Student }>())

export const getStudent = createAction(GET_STUDENT, props<{ id: number }>())
export const getStudentSuccess = createAction(GET_STUDENT_SUCCESS, props<{ obj: Student }>())

export const updateStudent = createAction(UPDATE_STUDENT, props<{ inputdata: Student, file: File }>())
export const updateStudentSuccess = createAction(UPDATE_STUDENT_SUCCESS, props<{ inputdata: Student }>())

export const deleteStudent = createAction(DELETE_STUDENT, props<{ id: number }>())
export const deleteStudentSuccess = createAction(DELETE_STUDENT_SUCCESS, props<{ id: number }>())
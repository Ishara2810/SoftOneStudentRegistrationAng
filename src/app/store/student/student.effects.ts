import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { StudentService } from "src/app/services/student.service";
import { addStudent, addaStudentSuccess, deleteStudent, deleteStudentSuccess, getStudent, getStudentSuccess, loadStudent, loadStudentFail, loadStudentSuccess, updateStudent, updateStudentSuccess, } from "./student.action";
import { catchError, exhaustMap, of, map, switchMap } from "rxjs";
import { showAlert } from "../common/app.action";

@Injectable()
export class StudentEffects {
    constructor(private actin$: Actions, private service: StudentService) {

    }

    _loadStudent = createEffect(() =>
        this.actin$.pipe(
            ofType(loadStudent),
            exhaustMap((action) => {
                return this.service.getAllStudents().pipe(
                    map((data) => {
                        return loadStudentSuccess({ list: data })
                    }),
                    catchError((_error) => of(loadStudentFail({ errormessage: _error.message })))
                )
            })
        )
    )

    _getassociate = createEffect(() =>
        this.actin$.pipe(
            ofType(getStudent),
            exhaustMap((action) => {
                return this.service.getStudentById(action.id).pipe(
                    map((data) => {
                        return getStudentSuccess({ obj: data })
                    }),
                    catchError((_error) => of(showAlert({ message: 'Failed to fetch data :' + _error.message, resulttype: 'fail' })))
                )
            })
        )
    )

    _addassociate = createEffect(() =>
        this.actin$.pipe(
            ofType(addStudent),
            switchMap((action) => {
                return this.service.insertStudent(action.inputdata, action.file).pipe(
                    switchMap((data) => {
                        return of(addaStudentSuccess({ inputdata: data }),
                            showAlert({ message: 'Created successfully.', resulttype: 'pass' }))
                    }),
                    catchError((_error) => of(showAlert({ message: 'Failed to create student', resulttype: 'fail' })))
                )
            })
        )
    )

    _updateassociate = createEffect(() =>
        this.actin$.pipe(
            ofType(updateStudent),
            switchMap((action) => {
                return this.service.updateStudent(action.inputdata, action.file).pipe(
                    switchMap((data) => {
                        return of(updateStudentSuccess({ inputdata: action.inputdata }),
                            showAlert({ message: 'Upadted successfully.', resulttype: 'pass' }))
                    }),
                    catchError((_error) => of(showAlert({ message: 'Failed to update student', resulttype: 'fail' })))
                )
            })
        )
    )

    _deleteStudent = createEffect(() =>
        this.actin$.pipe(
            ofType(deleteStudent),
            switchMap((action) => {
                return this.service.deleteStudentById(action.id).pipe(
                    switchMap((data) => {
                        return of(deleteStudentSuccess({ id: action.id }),
                            showAlert({ message: 'Deleted successfully.', resulttype: 'pass' }))
                    }),
                    catchError((_error) => of(showAlert({ message: 'Failed to delete student', resulttype: 'fail' })))
                )
            })
        )
    )

}
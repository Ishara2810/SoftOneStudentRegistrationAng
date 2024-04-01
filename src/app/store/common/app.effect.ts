import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MatSnackBar } from "@angular/material/snack-bar"

import { exhaustMap, map } from 'rxjs'
import { emptyAction, showAlert } from "./app.action";

@Injectable()
export class AppEffects {
    constructor(private $action: Actions, private _snackbar: MatSnackBar) {

    }

    _showAlert = createEffect(() =>
        this.$action.pipe(
            ofType(showAlert),
            exhaustMap((action) => {
                return this.showSnackbarAlert(action.message, action.resulttype).afterDismissed().pipe(
                    map(() => {
                        return emptyAction();
                    })
                )
            })
        )
    )


    showSnackbarAlert(message: string, resulttype: string = 'fail') {
        let _class = resulttype == 'pass' ? 'green-snackbar' : 'red-snackbar'
        return this._snackbar.open(message, 'OK', {
            verticalPosition: 'top',
            horizontalPosition: 'end',
            duration: 5000,
            panelClass: [_class]
        })
    }

}
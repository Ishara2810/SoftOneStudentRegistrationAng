import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { concatMap, of, switchMap } from 'rxjs';
import { Student } from 'src/app/store/models/student.model';
import { addStudent, deleteStudent, updateStudent } from 'src/app/store/student/student.action';
import { getLastInsertedRecordId, getStudent, getStudentList } from 'src/app/store/student/student.selectors';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {
  title = 'Create Student'
  @Input() isEdit: boolean = false;
  fileUrl: string = '';
  changedFileUrl: string = '';
  file!: File;
  imgChanged: boolean = false;
  @Output() editCompleteEvent: EventEmitter<any> = new EventEmitter();

  constructor(private builder: FormBuilder, private store: Store, private datePipe: DatePipe) { }

  ngOnInit(): void {

  }

  ngOnChanges(): void {
    if (this.isEdit === true) {
      this.title = 'Edit Student'
      this.store.select(getStudent).subscribe(res => {
        this.studentForm.setValue({
          id: res.id,
          firstName: res.firstName,
          lastName: res.lastName,
          mobileNo: res.mobileNo,
          email: res.email,
          nic: res.nic,
          dateOfBirth: res.dateOfBirth,
          address: res.address,
          imgPath: res.imgPath,
        })
        this.fileUrl = res.imgPath
      })
    } else {
      this.studentForm.reset();
    }
  }

  studentForm = this.builder.group({
    id: this.builder.control(0),
    firstName: this.builder.control('', Validators.required),
    lastName: this.builder.control('', Validators.required),
    mobileNo: this.builder.control('', [Validators.required,]),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    nic: this.builder.control('', Validators.required),
    dateOfBirth: this.builder.control('', Validators.required),
    address: this.builder.control('', Validators.required),
    imgPath: this.builder.control('')
  })

  SaveStudent() {
    if (this.studentForm.valid) {
      const _obj: Student = {
        id: this.isEdit ? this.studentForm.value.id! : 0 as number,
        firstName: this.studentForm.value.firstName as string,
        lastName: this.studentForm.value.lastName as string,
        mobileNo: this.studentForm.value.mobileNo as string,
        email: this.studentForm.value.email as string,
        nic: this.studentForm.value.nic as string,
        dateOfBirth: this.datePipe.transform(this.studentForm.value.dateOfBirth, 'yyyy-MM-dd') as string,
        address: this.studentForm.value.address as string,
        imgPath: this.fileUrl,
      }
      if (_obj.id === 0) {
        this.studentForm.reset();
      } else {
        this.store.dispatch(updateStudent({ inputdata: _obj, file: this.file }))
        this.isEdit = false;
      }
      setTimeout(() => {
        this.studentForm.reset();
      }, 0);
      this.resetInput();
      this.editCompleteEvent.emit(true);
    }
  }

  onFileChange(event: any) {
    const files = event.target.files as FileList;
    if (files.length > 0) {
      const _fileUrl = URL.createObjectURL(files[0]);
      this.fileUrl = _fileUrl;
      this.changedFileUrl = _fileUrl;
      this.file = files[0];
      this.imgChanged = true;
      this.resetInput();
    }
  }

  resetInput() {
    const input = document.getElementById('avatar-input-file') as HTMLInputElement;
    if (input) {
      input.value = "";
    }
  }

  createImgPath = (serverPath: string) => {
    if (this.imgChanged) {
      return this.changedFileUrl;
    } else if (this.isEdit && !this.imgChanged) {
      return serverPath != '' ? `${environment.fileBaseURL}${serverPath}` : "";
    } else {
      return ""
    }
  }

  delete() {
    var id = this.studentForm.value.id!
    if (confirm('do you want to remove?')) {
      this.store.dispatch(deleteStudent({ id: id }));
      this.editCompleteEvent.emit(true);
    }
  }

  closeForm() {
    this.editCompleteEvent.emit(true);
  }
}

import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddStudentComponent } from '../add-student/add-student.component';
import { Store } from '@ngrx/store';
import { deleteStudent, getStudent, loadStudent } from 'src/app/store/student/student.action';
import { getStudentList } from 'src/app/store/student/student.selectors';
import { Student } from 'src/app/store/models/student.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  studentList: Student[] = [];
  displayedColums: string[] = ["firstName", "lastName", "mobileNo", "email", "nic"]
  datasource: any;
  isRowSelected: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Output() rowClickedEvent: EventEmitter<any> = new EventEmitter();
  @Input() editCompleted: boolean = false;
  selectedRowIndex: number = -1;
  constructor(private dialog: MatDialog, private store: Store) {

  }

  ngOnInit(): void {
    this.store.dispatch(loadStudent());
    this.store.select(getStudentList).subscribe(item => {
      this.studentList = item;
      this.datasource = new MatTableDataSource<Student>(this.studentList);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    })
  }

  ngOnChanges(): void {
    if (this.editCompleted) {
      this.selectedRowIndex = -1;
    }
  }

  rowClicked(index: number, rowData: any): void {
    if (this.selectedRowIndex === index) {
      this.selectedRowIndex = -1;
      this.isRowSelected = false;
      this.editCompleted = true;
    } else {
      this.selectedRowIndex = index;
      this.isRowSelected = true;
      this.editCompleted = false;
    }

    if (this.isRowSelected) {
      console.log(rowData.id);
      this.store.dispatch(getStudent({ id: rowData.id }));
    }

    const data = {
      rowData: rowData,
      isRowSelected: this.isRowSelected
    }
    this.rowClickedEvent.emit(data);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }
}

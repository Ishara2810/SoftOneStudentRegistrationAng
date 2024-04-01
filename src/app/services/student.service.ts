import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../store/models/student.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  url: string = environment.apiBaseURL + 'Student';

  constructor(private http: HttpClient) { }

  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.url);
  }

  getStudentById(studentId: number): Observable<Student> {
    return this.http.get<Student>(this.url + '/' + studentId);
  }

  insertStudent(data: Student, file: File): Observable<Student> {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value.toString());
      }
    });
    if (file) {
      formData.append('file', file);
    }
    return this.http.post<Student>(this.url, formData);
  }

  updateStudent(data: Student, file: File): Observable<Student> {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value.toString());
      }
    });
    if (file) {
      formData.append('file', file);
    }
    return this.http.put<Student>(this.url, formData);
  }

  deleteStudentById(studentId: number): Observable<Student> {
    return this.http.delete<Student>(this.url + '/' + studentId);
  }

}

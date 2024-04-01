import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  showRegistrationForm: boolean = false;
  isEdit: boolean = false;
  editCompleted: boolean = false;
  isRowSelected: boolean = false;

  addStudent() {
    this.showRegistrationForm = true;
    this.isEdit = false;
    this.editCompleted = true;
    this.isRowSelected = false;
  }

  rowClickedEvent(event: any) {
    console.log(event);
    if (this.showRegistrationForm) {
      this.showRegistrationForm = false;
    }
    if (event.isRowSelected && this.isRowSelected) {
      this.editCompleted = true;
    } else {
      this.editCompleted = false;
    }
    this.showRegistrationForm = event.isRowSelected;
    this.isEdit = this.showRegistrationForm;
  }

  editCompleteEvent(event: boolean) {
    this.showRegistrationForm = !event
    this.isEdit = this.showRegistrationForm
    this.editCompleted = true;
  }
}

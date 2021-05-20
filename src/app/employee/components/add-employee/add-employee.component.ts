import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../../employee';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  public addEmployeeForm!: FormGroup;
  public todayDate: Date = new Date();
  public employeeList: Employee[] = [];

  @Output() public add = new EventEmitter<Employee[]>();

  constructor(private fb: FormBuilder, private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.addEmployeeForm = this.fb.group({
      employeeName: ['', Validators.required],
      department: [null, Validators.required],
      employeeCode: [''],
      birthday: [this.todayDate],
      gender: [''],
    });
  }

  addEmployee() {
    if (this.addEmployeeForm.dirty && this.addEmployeeForm.valid) {
      this.employeeList.push(this.addEmployeeForm.value)
      this.add.emit(this.employeeList);
      this.addEmployeeForm.reset();
      this.addEmployeeForm.value.birthday = this.todayDate;
      this.ref.detectChanges();
    } else {
    }
  }

  get employeeName() {
    return this.addEmployeeForm.get('employeeName');
  }

  get department() {
    return this.addEmployeeForm.get('department');
  }


}

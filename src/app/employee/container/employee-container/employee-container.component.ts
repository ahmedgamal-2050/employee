import { Component, OnInit } from '@angular/core';
import { Employee } from '../../employee';

@Component({
  selector: 'app-employee-container',
  templateUrl: './employee-container.component.html',
  styleUrls: ['./employee-container.component.scss']
})

export class EmployeeContainerComponent implements OnInit {
  public employee!: Employee;
  public employeeList: Employee[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  addEmployee(employeeList: Employee[]) {
    localStorage.setItem('employeeList', JSON.stringify(employeeList));
    this.employeeList = JSON.parse(localStorage.getItem("employeeList") as string);
    //console.log(this.employeeList);
  }
}

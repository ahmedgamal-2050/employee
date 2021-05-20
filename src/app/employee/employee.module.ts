import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeContainerComponent } from './container/employee-container/employee-container.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { SearchEmployeeComponent } from './components/search-employee/search-employee.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';

const employeeRoutes: Routes = [
  {
    path: 'addEmployee',
    component: AddEmployeeComponent,
    pathMatch: "prefix"
  },
  {
    path: 'searchEmployee',
    component: SearchEmployeeComponent
  }
];

@NgModule({
  declarations: [
    EmployeeContainerComponent,
    AddEmployeeComponent,
    SearchEmployeeComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(employeeRoutes),
    MatTableModule,
    MatCheckboxModule
  ],
  providers: [],
})
export class EmployeeModule { }

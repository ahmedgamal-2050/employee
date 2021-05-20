import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeContainerComponent } from './employee/container/employee-container/employee-container.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeContainerComponent,
    loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

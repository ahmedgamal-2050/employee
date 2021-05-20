import { ChangeDetectorRef, Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../../employee';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-search-employee',
  templateUrl: './search-employee.component.html',
  styleUrls: ['./search-employee.component.scss']
})
export class SearchEmployeeComponent implements OnInit, OnChanges {
  @Input() public employeeList: Employee[] = [];
  public employeeFilteredList: Employee[] = [];
  public isSelected: boolean = false;
  public searchEmployeeForm!: FormGroup;
  displayedColumns: string[] = ['isSelected','employeeName', 'department', 'employeeCode', 'birthday', 'gender'];
  dataSource = new MatTableDataSource<Employee>();
  selection = new SelectionModel<Employee>(true, []);

  constructor(private fb: FormBuilder, private ref: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.searchEmployeeForm = this.fb.group({
      employeeName: ['', Validators.required],
      department: [null, Validators.required]
    });

    this.searchEmployeeForm.valueChanges.subscribe(value => {
      if (value.employeeName === '' || value.employeeName === ' ') {
        this.employeeFilteredList = this.employeeList;
        this.dataSource = new MatTableDataSource<Employee>(this.employeeFilteredList);
        this.ref.detectChanges();
      }
    });
  }

  ngOnChanges() {
    this.employeeFilteredList = this.employeeList;
    this.dataSource = new MatTableDataSource<Employee>(this.employeeFilteredList);
    this.ref.detectChanges();
  }

  searchEmployee() {
    if (this.searchEmployeeForm.dirty && this.searchEmployeeForm.valid) {
      //console.log(this.searchEmployeeForm.value.employeeName);
      this.employeeFilteredList = [];
      this.dataSource = new MatTableDataSource<Employee>(this.employeeFilteredList);
      for (let i = 0; i < this.employeeList.length; i++) {
        //console.log(i);
        if (this.employeeList[i].employeeName.toLowerCase().indexOf(this.searchEmployeeForm.value.employeeName.toLowerCase()) > -1 && this.searchEmployeeForm.value.department === this.employeeList[i].department) {
          this.employeeFilteredList.push(this.employeeList[i]);
          this.dataSource = new MatTableDataSource<Employee>(this.employeeFilteredList);
          //console.log(this.employeeList[i]);
        }
      }
      this.ref.detectChanges();
    } else {
      this.employeeFilteredList = this.employeeList;
      this.dataSource = new MatTableDataSource<Employee>(this.employeeFilteredList);
      this.ref.detectChanges();
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Employee): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.employeeName + 1}`;
  }

  get employeeName() {
    return this.searchEmployeeForm.get('employeeName');
  }

  get department() {
    return this.searchEmployeeForm.get('department');
  }
}

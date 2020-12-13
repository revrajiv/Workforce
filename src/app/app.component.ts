import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Employee } from 'src/model/employee';
import { EmployeeData } from 'src/model/employee-data';
import { EmployeeService } from 'src/service/employee.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  employeeData: EmployeeData = new EmployeeData();
  employeesList: Employee[] = [];
  p: number = 1;
  employees: boolean;
  addEmployee: boolean;
  empDetail: boolean;
  newEmployee: Employee = new Employee();
  selectedEmployee: Employee;
  constructor(
    private httpClient: HttpClient,
    private employeeService: EmployeeService) {
  }
  title = 'workforce';
  ngOnInit() {
    this.employees = true;
    this.getEmployeeData();
  }
  getEmployeeData() {
    this.employeeService.getEmployeeData().subscribe((data: any) => {
      console.log(data);
      this.employeeData = data;
      this.employeesList = data.data;
    });
  }

  switchView(value: string) {
    if (value == 'EMPLOYEES') {
      this.employees = true;
      this.addEmployee = false;
      this.empDetail = false;
    }
    else if (value == 'ADDEMP') {
      this.employees = false;
      this.addEmployee = true;
      this.empDetail = false;
    }
    else if (value == 'EMPDETAIL') {
      this.employees = false;
      this.addEmployee = false;
      this.empDetail = true;
    }
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event) => {
        this.newEmployee.avatar = event.target.result;
      }
    }

  }
  goToEmpDetail(employee: Employee) {
    this.switchView('EMPDETAIL');
    this.selectedEmployee = employee;
  }
  saveEmployee() {
    this.employeeService.populateEmployeeDataFromEmployeeDetail(this.employeeData, this.newEmployee, this.employeesList.length);
    this.employeeService.setEmployeeData(this.employeeData);
    /*  const blob = new Blob([JSON.stringify(this.employeeData)], { type: 'application/json' });
     saveAs(blob, "assets/employee.json"); */
    this.switchView('EMPLOYEES');
  }
  updateEmployee() {

  }
  removeEmployee() {
    this
  }
}

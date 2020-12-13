import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from 'src/model/employee';
import { EmployeeData } from 'src/model/employee-data';

@Injectable({
    providedIn: 'root'
})

export class EmployeeService {
    constructor(private httpClient: HttpClient,
    ) {
    }
    getEmployeeData() {
        return this.httpClient.get("assets/employee.json");
    }
    setEmployeeData(employeeData: EmployeeData) {
        // this.httpClient.post("assets/employee.json", employeeData);
        const options = { Headers, responseType: 'json' as 'blob' };
        this.httpClient.post("assets/employee.json", employeeData, options);
    }
    populateEmployeeDataFromEmployeeDetail(empData: EmployeeData, employee: Employee, empLength: number) {
        employee.id = empLength + 1;
        empData.data.push({
            'id': employee.id,
            'first_name': employee.first_name,
            'last_name': employee.last_name,
            'email': employee.email,
            'avatar': employee.avatar,
        });
        empData.total = empData.total + 1;

        return empData;
    }

}
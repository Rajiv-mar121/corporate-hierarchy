import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient: HttpClient) { }

  getAllEmployee():Observable<Employee[]>{
    //https://jsonplaceholder.typicode.com/users
    return this.httpClient.get<Employee[]>("/api/employees");
  }

  addEmployee(employeePayload: any){
    return this.httpClient.post("/api/employees",employeePayload);
  }

  uploadCSV(csvfileData :any){
    return this.httpClient.post("/api/employees/upload",csvfileData);
  }


  getEmployeeById(empId: string){}
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient: HttpClient) { }

  getAllEmployee():Observable<any>{
    //https://jsonplaceholder.typicode.com/users
    return this.httpClient.get("/api/employees");
  }

  addEmployee(employeePayload: any){
    return this.httpClient.post("/api/employees",employeePayload);
  }

  getEmployeeById(empId: string){}
}

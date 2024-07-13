import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient: HttpClient) { }

  getAllEmployee():Observable<any>{
    return this.httpClient.get("https://jsonplaceholder.typicode.com/users");
  }

  getEmployeeById(empId: string){}
}

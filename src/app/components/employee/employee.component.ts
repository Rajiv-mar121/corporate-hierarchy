import { AsyncPipe, DatePipe, JsonPipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Form, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';


@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, UpperCasePipe, TitleCasePipe, DatePipe, JsonPipe, AsyncPipe],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {

  name: string = "Raijv";
  userData: any[] =[];

  constructor(private router: Router, private httpClient: HttpClient, private employeeService: EmployeeService) {

  }
//empId: new FormControl("", [Validators.required, Validators.required]),
  formValue: any;
  employeeForm: FormGroup = new FormGroup({
    
    email: new FormControl("", [Validators.required, Validators.required,Validators.email]),
    name: new FormControl("", [Validators.required, Validators.required, Validators.minLength(3)]),
    designation: new FormControl(""),
    department: new FormControl(""),
    manager_id: new FormControl(0),
   // manager_name: new FormControl(""),
    team: new FormControl(""),
  });

  navigate() {
    this.router.navigateByUrl("");
  }
  onSubmit() {
    this.formValue = this.employeeForm.value;
    this.employeeService.addEmployee( this.formValue).subscribe((res:any)=>{
      console.log("User added");
      this.reset();
    })
    this.employeeService.getAllEmployee().subscribe((res:any)=>{
      this.userData = res;

    })
    // this.httpClient.get("https://jsonplaceholder.typicode.com/users").subscribe((res:any)=>{
    //   this.userData = res;

    // })
    // make service call to save 

  }

  reset(){
    this.employeeForm.reset();
  }

}

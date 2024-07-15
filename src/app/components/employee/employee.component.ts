import { AsyncPipe, CommonModule, DatePipe, JsonPipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Form, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/Employee';


@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, UpperCasePipe, TitleCasePipe, DatePipe, JsonPipe, AsyncPipe, CommonModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {

  name: string = "Raijv";
  employeeData: Employee[] = [];
  showAddEmployeeForm: boolean = false;
  showKGraph: boolean = false;
  selectedFile: File | null = null;

  constructor(private router: Router, private httpClient: HttpClient, private employeeService: EmployeeService) {

  }

  ngOnInit(): void {
    this.loadEmployees()
  }
  //empId: new FormControl("", [Validators.required, Validators.required]),
  formValue: any;
  employeeForm: FormGroup = new FormGroup({

    email: new FormControl("", [Validators.required, Validators.required, Validators.email]),
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
    this.employeeService.addEmployee(this.formValue).subscribe((res: any) => {
      console.log("User added");
      this.showAddEmployeeForm = false;
      this.reset();
      this.loadEmployees();
    })
  }


  loadEmployees() {
    this.employeeService.getAllEmployee().subscribe((res: Employee[]) => {
      this.employeeData = res;

    }, error => {
      console.error('Unable to load employee', error);
      alert('Unable to load');
    })
  }

  reset() {
    this.employeeForm.reset();
  }

  showEmployeeForm() {
    this.showAddEmployeeForm = !this.showAddEmployeeForm;
  }

  showGraph(){
    console.log("show graph")
    this.showKGraph = !this.showKGraph;
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file && file.type === 'text/csv') {
      this.selectedFile = file;
    } else {
      alert('Please select a valid CSV file.');
    }
  }

  onUpload(): void {
    if (!this.selectedFile) {
      alert('No file selected.');
      return;
    }
    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
    // make api call

    this.employeeService.uploadCSV(formData).subscribe((res: any) => {
      console.log('Upload success', res);
      alert('File uploaded successfully.');
    },
      error => {
        console.error('Upload error', error);
        alert('File upload failed.');
      }
    )    
  }

  

}

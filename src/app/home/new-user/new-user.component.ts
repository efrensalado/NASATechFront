import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
import { UsersModel } from 'src/app/models/users-model';
import { BackendApiService } from 'src/app/services/backend-api.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  FullName: string = "";
  Email: string = "";
  Password: string = "";
  RoleId: number = 0;
  Model : UsersModel = new UsersModel;

  emailRegex: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  passRegex: RegExp = /^(?=.3[A-Z])(?=.3*[a-z])(?=.2*[0-9])(=.2*[@$!%*?&]){10,10}$/;

  Message: string = ""
  ConfirmMessage : string = "";
  data: any;

  /*UserForm = new FormGroup({
    Email: new FormControl('',[
      Validators.required,
  	  Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ]),
    Password: new FormControl(''),
    FullName: new FormControl(''),
    RoleId: new FormControl('')
  });*/

  constructor(private http: BackendApiService,
    private router: Router, 
    private httpClient: HttpClient) {
      this.httpClient.get('https://localhost:7009/api/roles/').subscribe(data => { 
      this.data = data;
      console.log(data)
      
      }, error => console.error(error));
  }

  ngOnInit () : void {
    if (this.http.GetToken() == "") {
      this.router.navigate(['../..']);
    }
  }

  Validate() : any {
    this.Message = "";
    if (this.FullName == "" || this.Password == ""
        || this.Email == "" || this.RoleId == 0) {
      this.Message = "All inputs are required";
    } else {
      if (!this.emailRegex.test(this.Email)) {
        this.Message = this.Message + "\nInvalid Email"
      }
      let passValidation :string = this.ValidatePassword(this.Password);
      if (passValidation != "") {
        this.Message = this.Message + "\n" + passValidation;
      }
    }
    console.log(this.Message)
    if (this.Message == "") {
      this.Model.Email = this.Email;
      this.Model.Password = this.Password;
      this.Model.FullName = this.FullName;
      this.Model.RoleId = this.RoleId;
      return this.http.Register(this.Model).subscribe(data => {
        console.log(data)
        this.ConfirmMessage = "User added."
        delay(1000)
        this.router.navigate(['../home/users']);
      }, error => console.log(error));
    }
  }

  ValidatePassword (pass: string): string {
    let res : string = "";

    let regUpper: RegExp = /[A-Z]{3}/;
    let regLower: RegExp = /[a-z]{3}/;
    let regSymbols: RegExp = /[@$!%*?&]{2}/;
    let regNumbers: RegExp = /[0-9]{2}/;

    if (!regUpper.test(pass) ||
    !regLower.test(pass) ||
    !regSymbols.test(pass) ||
    !regNumbers.test(pass)) {
      res = "Invalid password format"
    }

    return res;
  }
}

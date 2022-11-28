import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from '../models/login-model';
import { BackendApiService } from '../services/backend-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  Email: string = "";
  Password: string = "";
  Model : LoginModel = new LoginModel;

  constructor(private http: BackendApiService,
    private router: Router) {
    this.Email = "";
    this.Password = "";
  }

  ngOnInit() : void {
    if (this.http.GetToken() != "") {
      this.router.navigate(['/home/users']);
    }
  }

  login() {
    this.Model.Email = this.Email;
    this.Model.Password = this.Password;

    console.log(this.Model);

    this.http.Login(this.Model).subscribe(data => {
      console.log(data);
      if (data != null) {
        this.http.SetToken(JSON.stringify(data));
        this.router.navigate(['home/users']);
      }
    });
  }
}

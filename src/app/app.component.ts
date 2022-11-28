import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendApiService } from './services/backend-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'NasaFront';

  constructor(private router: Router,
    private http: BackendApiService) {

  }

  ngOnInit() : void {
    if (this.http.GetToken() != "") {
      this.router.navigate(['/home/users']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  GoToLogin() : void {
    this.router.navigate(['login']);
  }
}

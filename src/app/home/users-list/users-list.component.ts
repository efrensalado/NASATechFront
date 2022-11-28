import { HttpClient } from '@angular/common/http';
import { Component, Directive, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UsersModel } from 'src/app/models/users-model';
import { BackendApiService } from 'src/app/services/backend-api.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})

export class UsersListComponent implements OnInit {
  UsersList: UsersModel[] = [];
  data: any;

  // Must be declared as "any", not as "DataTables.Settings"
  dtOptions: any = {};

  constructor(private http: BackendApiService,
    private router: Router, 
    private httpClient: HttpClient) {
      this.httpClient.get('https://localhost:7009/api/users/').subscribe(data => { 
      this.data = data;
      console.log(data)
      setTimeout(()=>{   
        $('#usersTable').DataTable( {
          pagingType: 'full_numbers',
          pageLength: 5,
          processing: true,
          lengthMenu : [5, 10, 25],
          dom: 'Bfrtip'
        } );
      }, 1);
      
      }, error => console.error(error));
  }

  ngOnInit() : void {
    if (this.http.GetToken() == "") {
      this.router.navigate(['../..']);
    }
  }

  GetAll() : any {
    return this.http.GetAllUsers().subscribe(data => {
      let result = (data as UsersModel[]);
      console.log(result)
      this.UsersList = result;
      $('#usersTable').DataTable( {
        pagingType: 'full_numbers',
        pageLength: 10,
        processing: true,
        lengthMenu : [10, 25, 50, 100]
      });
    });
  }

  LogOut() : void {
    this.http.RemoveToken();
    this.router.navigate(['../../login']);
  }
}

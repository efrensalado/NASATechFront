import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { UsersModel } from '../models/users-model';
import { Roles } from '../models/roles';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class BackendApiService {

  BASE_URL = "https://localhost:7009/api/";
  HEADERS : any = new HttpHeaders({
    'Content-Type' : 'application/json',
    'Cache-Control': 'no-cache',
    'Accept' : '*',
    'Connection': 'keep-alive'
  });

  OPTIONS = {
    headers: this.HEADERS
  }

  constructor(private http: HttpClient, private cookies: CookieService) {
  }

  Login(User: any): Observable<any> {
    return this.http.post(this.BASE_URL + "login", User);
  }

  Register(User: any): Observable<any> {
    return this.http.post<any>(this.BASE_URL + "Users/", User, this.OPTIONS);
  }

  GetAllUsers(): Observable<any> {
    return this.http.get<UsersModel[]>(this.BASE_URL + "users/");
  }

  GetAllRoles(): Observable<any> {
    return this.http.get<Roles[]>(this.BASE_URL + "roles/");
  }

  SetToken(token: string) {
    this.cookies.set("token", token);
  }
  GetToken() {
    return this.cookies.get("token");
  }
  RemoveToken() : void {
    this.cookies.delete("token");
    this.cookies.deleteAll();
  }
}

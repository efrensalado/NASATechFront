import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { UsersListComponent } from './users-list/users-list.component';
import { DataTablesModule } from 'angular-datatables';
import { NewUserComponent } from './new-user/new-user.component';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { BackendApiService } from '../services/backend-api.service';


@NgModule({
  declarations: [
    HomeComponent,
    UsersListComponent,
    NewUserComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    BackendApiService
  ]
})
export class HomeModule { }

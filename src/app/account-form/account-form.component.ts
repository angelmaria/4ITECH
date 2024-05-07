

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-account-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './account-form.component.html',
  styleUrl: './account-form.component.css'
})
export class AccountFormComponent implements OnInit {

  user: User | undefined;

  userForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    phone: new FormControl(),
    userName: new FormControl(),
    password: new FormControl(),
    address: new FormControl(),

  });

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.httpClient.get<User>('http://localhost:8080/users/account')
    .subscribe(user => {
      this.user = user;
      this.userForm.reset(user);
    });
  }

  save() {
    console.log("save1");
    
    if (!this.user) {
      return;
    }    console.log("save2");

    this.user.firstName = this.userForm.get('firstName')?.value;
    this.user.lastName = this.userForm.get('lastName')?.value;
    this.user.phone = this.userForm.get('phone')?.value;
    this.user.userName = this.userForm.get('userName')?.value;
    this.user.password = this.userForm.get('password')?.value;
    this.user.address = this.userForm.get('address')?.value;

    console.log(this.user);
    
    this.httpClient.put<User>('http://localhost:8080/users/account', this.user)
    .subscribe(user => this.user = user);
  }

}

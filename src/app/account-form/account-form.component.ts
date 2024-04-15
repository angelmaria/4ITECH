

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
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
    if (!this.user) {
      return;
    }
    this.user.name = this.userForm.get('name')?.value;
    this.user.lastName = this.userForm.get('lastName')?.value;
    this.user.street = this.userForm.get('street')?.value;
    this.httpClient.put<User>('http://localhost:8080/users/account', this.user)
    .subscribe(user => this.user = user);
  }

}

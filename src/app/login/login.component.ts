import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Login } from '../models/login.dto';
import { RouterLink } from '@angular/router';
import { Token } from '../models/token.dto';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = this.fb.group ({
    email: [''],
    password: ['']
  })

  constructor(private fb: FormBuilder, private httpClient: HttpClient) {}

  save() {
    const login: Login = {
      email: this.loginForm.get('email')?.value ?? '',
      password: this.loginForm.get('password')?.value ?? '',
    }
    console.log(login);
    const url = 'http://localhost:8080/users/login';
    this.httpClient.post<Token>(url,login).subscribe(response => {
      console.log(response.token);
      // this.authService.saveToken(response.token);
      // this.router.navigate(['/books']);
    });

  }
    // ojo inacabado??...post<any>??? console.log(response) ??
}

import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../models/user.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterLink, HttpClientModule],
  /*
  'RouterLink' permite navegar en este listado de ususarios;
  'HttpClient' permite llamar al controlador del backend y traer los datos.
  */
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit{
  
  users: User[] = []; //variable donde se guarda la respuesta del método 'ngOnInit'.

  constructor(private httpClient: HttpClient){};

  ngOnInit(): void {
    // Trae una lista de usuarios del backend.
    const backendUrl = 'http://localhost:8080/users';
    this.httpClient.get<User[]>(backendUrl).subscribe(users => {
      console.log(users);
      this.users = users
    })
  }

}

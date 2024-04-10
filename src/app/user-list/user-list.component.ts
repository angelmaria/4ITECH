import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../models/user.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterLink, NgbAlertModule],
  /*
  'RouterLink' permite navegar en este listado de ususarios;
  'HttpClient' permite llamar al controlador del backend y traer los datos.
  */
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit{
  
  users: User[] = []; //variable donde se guarda la respuesta del método 'ngOnInit'.
  showDeletedUserMessage: boolean = false;

  constructor(private httpClient: HttpClient){};

  ngOnInit(): void {
  
    this.loadUsers(); // Trae una lista de usuarios del backend ejecutando una petición HTTP contra controlador.
  }
  
  delete (user: User){
    const url = 'http://localhost:8080/users/' + user.id;
    this.httpClient.delete(url).subscribe(Response => {
      this.loadUsers(); // recarga los usuarios después de borrar uno.
      this.showDeletedUserMessage = true;
    });  
  }

  hideDeletedUserMessage() { //método que solo cambia la variable booleana de arriba de true a false
    this.showDeletedUserMessage = false;
  }
  
  private loadUsers(){
    const backendUrl = 'http://localhost:8080/users';
    this.httpClient.get<User[]>(backendUrl).subscribe(users => {
      this.users = users;
    });
  }
}



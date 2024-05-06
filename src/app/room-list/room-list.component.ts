import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Room } from '../models/room.model';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [RouterLink, NgbAlertModule],
  /*
  'RouterLink' permite navegar en este listado de salas;
  'HttpClient' permite llamar al controlador del backend y traer los datos.
  */
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.css'
})
export class RoomListComponent implements OnInit{

  rooms: Room[] = [];
  showDeletedRoomMessage: boolean = false;
  isAdmin = false;

  constructor(private httpClient: HttpClient,
              private authService: AuthenticationService) {
                this.authService.isAdmin.subscribe(isAdmin => this.isAdmin = isAdmin);
  };

  ngOnInit(): void {
      this.loadRooms();
  }

  delete (room: Room){
    const url = 'http://localhost:8080/rooms/' + room.id;
    this.httpClient.delete(url).subscribe(Response => {
      this.loadRooms(); // recarga las salas tras borrar una de ellas.
      this.showDeletedRoomMessage = true;
    });
  }

  hideDeletedRoomMessage() {
    this.showDeletedRoomMessage = false;
  }

  private loadRooms() {
    const backendUrl = 'http://localhost:8080/rooms';
    this.httpClient.get<Room[]>(backendUrl).subscribe(rooms => {
      this.rooms = rooms;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Room } from '../models/room.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-room-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './room-detail.component.html',
  styleUrl: './room-detail.component.css'
})
export class RoomDetailComponent implements OnInit{

  room: Room | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient
  ){}


  ngOnInit(): void {
    
    //Extraer el id de la url y traer la sala del backend con la petición HTTP GET:
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (!id) return;
    
      const backendUrl = 'http://localhost:8080/rooms/' + id;
      this.httpClient.get<Room>(backendUrl).subscribe(roomFromBackend => {
        this.room = roomFromBackend;
        console.log(this.room);
      });

      // TODO: Traer todas las charlas que se celebran en esta sala
      // /keynotes/filter-by-room/id
    });
  }

}

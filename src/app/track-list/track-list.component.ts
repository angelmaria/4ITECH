import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Track } from '../models/track.model';


@Component({
  selector: 'app-track-list',
  standalone: true,
  imports: [RouterLink, HttpClientModule],
  templateUrl: './track-list.component.html',
  styleUrl: './track-list.component.css'
})
export class TrackListComponent implements OnInit {

  tracks: Track[] = [];

  constructor(private httpClient: HttpClient) {};

  ngOnInit(): void {
    // traer una lista de tracks del backend: crea y ejecuta una petición HTTP contra un controlador Backend
    const backendUrl = 'http://localhost:8080/tracks';
    this.httpClient.get<Track[]>(backendUrl).subscribe(tracks => {
      console.log(tracks);
      // guardamos la respuesta del backend en una variable para poder usarla
      this.tracks = tracks;
    });
  }
}   

  


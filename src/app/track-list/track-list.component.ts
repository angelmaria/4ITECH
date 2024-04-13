import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { Track } from '../models/track.model';
import { AuthenticationService } from '../authentication/authentication.service';


@Component({
  selector: 'app-track-list',
  standalone: true,
  imports: [RouterLink, NgbAlertModule, DatePipe],
  templateUrl: './track-list.component.html',
  styleUrl: './track-list.component.css'
})
export class TrackListComponent implements OnInit {

  tracks: Track[] = [];
  showDeletedBookMessage: boolean = false;

  isAdmin = false;
  isLoggedIn = false;

  constructor(private httpClient: HttpClient,
              private authService: AuthenticationService
  ) {
    this.authService.isAdmin.subscribe(isAdmin => this.isAdmin = isAdmin);
    this.authService.isLoggedIn.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);

  };

  ngOnInit(): void {
    // traer una lista de tracks del backend: crea y ejecuta una petición HTTP contra un controlador Backend
    this.loadTracks();
  }

  delete (track: Track) {
    const url = 'http://localhost:8080/tracks/' + track.id;
    this.httpClient.delete(url).subscribe(Response => {
       this.loadTracks();  // recarga los libros despues de borrar
       this.showDeletedBookMessage = true;
      });  
    }
    hideDeletedBookMessage() { //solo cambia la variable booleana de arriba de true a false
      this.showDeletedBookMessage = false;
      }

  private loadTracks() {
    const backenUrl = 'http://localhost:8080/tracks';
    this.httpClient.get<Track[]>(backenUrl).subscribe(tracks => {
       this.tracks = tracks;
    });
  }
}
   


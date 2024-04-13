import { Component, OnInit } from '@angular/core';
import { Track } from '../models/track.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Keynote } from '../models/keynote.model';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-track-detail',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './track-detail.component.html',
  styleUrl: './track-detail.component.css'
})
export class TrackDetailComponent implements OnInit {

  track: Track | undefined;
  keynotes: Keynote[] = [];
  isAdmin = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthenticationService
  ) {      this.authService.isAdmin.subscribe(isAdmin => this.isAdmin = isAdmin);
  }

  ngOnInit(): void {
    // extraer el id de la url
    // traer el track de backend utilizando petición HTTP GET
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (!id) { 
        return;
      }
      const backendUrl = 'http://localhost:8080/tracks/' + id;
      this.http.get<Track>(backendUrl).subscribe(trackBackend => {
        this.track = trackBackend;
        //console.log(this.track);

       // traer las keynotes del track
       this.http.get<Keynote[]>('http://localhost:8080/keynotes/filter-by-track/' + id)
       .subscribe(keynotes => this.keynotes = keynotes);
      });

    });

  }
  
}

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Keynote } from '../models/keynote.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-keynote-detail',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './keynote-detail.component.html',
  styleUrl: './keynote-detail.component.css'
})
export class KeynoteDetailComponent implements OnInit {
  keynote: Keynote | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    // extraer el id de la url
    // traer el keynote de backend utilizando petición HTTP GET
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (!id) return;
      const backendUrl = 'http://localhost:8080/keynotes/' + id;
      this.httpClient.get<Keynote>(backendUrl).subscribe(keynoteBackend => {
        this.keynote = keynoteBackend;
        console.log(this.keynote);
      });

    });

  }
}

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Keynote } from '../models/keynote.model';

@Component({
  selector: 'app-keynote-list',
  standalone: true,
  imports: [RouterLink, HttpClientModule],
  templateUrl: './keynote-list.component.html',
  styleUrl: './keynote-list.component.css'
})
export class KeynoteListComponent implements OnInit {
  keynotes: Keynote[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // traer una lista de keynotes del backend: crea y ejecuta una petición HTTP contra un controlador Backend
    const backenUrl = 'http://localhost:8080/keynotes';
    this.http.get<Keynote[]>(backenUrl).subscribe(keynotes => {
      console.log(keynotes);
      // guardamos la respuesta del backend en una variable para poder usarla
      this.keynotes = keynotes;
    });
  }
}

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Keynote } from '../models/keynote.model';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-keynote-list',
  standalone: true,
  imports: [RouterLink, HttpClientModule, NgbAlertModule, DatePipe],
  templateUrl: './keynote-list.component.html',
  styleUrl: './keynote-list.component.css'
})
export class KeynoteListComponent implements OnInit {
  
  keynotes: Keynote[] = [];
  showDeleteKeynoteMessage: boolean = false

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.loadsKeynotes();
  }

  delete(keynote: Keynote) {
    // traer una lista de keynotes del backend: crea y ejecuta una petición HTTP contra un controlador Backend
    const url = 'http://localhost:8080/keynotes/' + keynote.id;
    this.httpClient.delete(url).subscribe(keynotes => {
      this.loadsKeynotes();
      this.showDeleteKeynoteMessage = true;
    }); // recarga los keynoets después de borrar
  }
  hideDeleteKeynoteMessage() {
    this.showDeleteKeynoteMessage = false;
  }
  private loadsKeynotes() {
    const url = 'http://localhost:8080/keynotes';
    this.httpClient.get<Keynote[]>(url).subscribe(keynotes => this.keynotes = keynotes);
  }
}

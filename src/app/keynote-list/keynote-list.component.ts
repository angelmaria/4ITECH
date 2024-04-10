import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Keynote } from '../models/keynote.model';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-keynote-list',
  standalone: true,
  imports: [RouterLink, NgbAlertModule, DatePipe],
  templateUrl: './keynote-list.component.html',
  styleUrl: './keynote-list.component.css'
})
export class KeynoteListComponent implements OnInit {
  
  keynotes: Keynote[] = [];
  showDeleteKeynoteMessage: boolean = false;
  isAdmin = false;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthenticationService) {
      this.authService.isAdmin.subscribe(isAdmin => this.isAdmin = isAdmin);
    }

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
  archive(keynote: Keynote){
    //keynote.published = false;
    //this.httpClient.put<Keynote>(url, keynote). subscribe
     //   this.loadsKeynotes
  }
  private loadsKeynotes() {
    const url = 'http://localhost:8080/keynotes';
    this.httpClient.get<Keynote[]>(url).subscribe(keynotes => this.keynotes = keynotes);
  }
}

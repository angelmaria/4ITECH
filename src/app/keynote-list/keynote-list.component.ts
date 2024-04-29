import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Keynote } from '../models/keynote.model';
import { NgbAlertModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe, JsonPipe } from '@angular/common';
import { AuthenticationService } from '../authentication/authentication.service';
import { Observable, OperatorFunction, debounceTime, distinctUntilChanged, map } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

const charlas = [
	'Inteligencia Artificial',
	'Realidad Virtual',
	'Experiencia de Usuario (UX)',
	'Ciberseguridad',
	'Cloud Computing',
	'Blockchain',
	'Bid Data',
	'Internet de las cosas (IoT)',
];

@Component({
  selector: 'app-keynote-list',
  standalone: true,
  imports: [RouterLink, NgbAlertModule, DatePipe, NgbTypeaheadModule, FormsModule, JsonPipe],
  templateUrl: './keynote-list.component.html',
  styleUrl: './keynote-list.component.css'
})
export class KeynoteListComponent implements OnInit {

  model: any;

	search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
		text$.pipe(
			debounceTime(200),
			distinctUntilChanged(),
			map((term) =>
				term.length < 2 ? [] : charlas.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10),
			),
		);
  
  keynotes: Keynote[] = [];
  showDeleteKeynoteMessage: boolean = false;
  isAdmin = false;
  isLoggedIn = false;
  visible = true;

  constructor(
    private httpClient: HttpClient,
    protected sanitizer: DomSanitizer,
    private authService: AuthenticationService) {
      this.authService.isAdmin.subscribe(isAdmin => this.isAdmin = isAdmin);
      this.authService.isLoggedIn.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
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
    keynote.visible = false;
    //this.httpClient.put<Keynote>(url, keynote). subscribe
     //   this.loadsKeynotes
  }
  private loadsKeynotes() {
    const url = 'http://localhost:8080/keynotes';
    this.httpClient.get<Keynote[]>(url).subscribe(keynotes => this.keynotes = keynotes);
  }
}

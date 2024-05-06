import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Keynote } from '../models/keynote.model';
import { NgbAlertModule, NgbTypeaheadModule, NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe, JsonPipe } from '@angular/common';
import { AuthenticationService } from '../authentication/authentication.service';
import { Observable, OperatorFunction, catchError, debounceTime, distinctUntilChanged, map, of, switchMap, tap } from 'rxjs';
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

@Injectable()
export class KeynoteSearchService {
	private http = inject(HttpClient);

	search(term: string) {
		if (term === '') {
			return of([]);
		}

		return this.http
			.get<[any, string[]]>(`http://localhost:8080/keynotes/filter-by-title-arr/${term}`)
			.pipe(map((response) => {
        console.log(response);
        return response;
        
      }));
	}
  findAllFilterByTitle(term: string) {
    return this.http.get<Keynote[]>(`http://localhost:8080/keynotes/filter-by-title/${term}`);
  }
}

@Component({
  selector: 'app-keynote-list',
  standalone: true,
  imports: [RouterLink, NgbAlertModule, DatePipe, NgbTypeaheadModule, FormsModule, JsonPipe],
  templateUrl: './keynote-list.component.html',
  styleUrl: './keynote-list.component.css',
  providers: [KeynoteSearchService]
})
export class KeynoteListComponent implements OnInit {


  // model: string = '';

	// search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
	// 	text$.pipe(
	// 		debounceTime(200),
	// 		distinctUntilChanged(),
	// 		map((term) =>
	// 			term.length < 2 ? [] : charlas.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10),
	// 		),
	// 	);

  model: any;
	searching = false;
	searchFailed = false;


  
  keynotes: Keynote[] = [];
  showDeleteKeynoteMessage: boolean = false;
  isAdmin = false;
  isLoggedIn = false;
  visible = true;

  constructor(
    private httpClient: HttpClient,
    protected sanitizer: DomSanitizer,
    private authService: AuthenticationService,
  private searchService: KeynoteSearchService) {
      this.authService.isAdmin.subscribe(isAdmin => this.isAdmin = isAdmin);
      this.authService.isLoggedIn.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
    }

  ngOnInit(): void {
    this.loadsKeynotes();
  }

	search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
		text$.pipe(
			debounceTime(300),
			distinctUntilChanged(),
			tap(() => (this.searching = true)),
			switchMap((term) => 
				{
          console.log("searching term");
          if(!term || term.length === 0)
            this.loadsKeynotes();
            
          return this.searchService.search(term).pipe()
        },
			),
			tap(() => (this.searching = false)),
		);

    onSelectTitle(event: NgbTypeaheadSelectItemEvent<any>) {
      console.log(event);
      
        this.searchService.findAllFilterByTitle(event.item).subscribe((results) => {
          this.keynotes = results;
        });
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
